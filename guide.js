// ガイドの表示ロジック。ゲーム内（NUI）でも Web でも同じコードが動く。
// 環境差は isInGame() の 1 箇所だけで吸収する。
// 表示のみ。サーバーへの問い合わせ・状態の確定は一切行わない。
(function () {
  'use strict';

  var DATA = window.GUIDE;
  var root = document.getElementById('guide');
  var tree = document.getElementById('side-tree');
  var article = document.getElementById('article');
  var main = document.getElementById('main');
  var side = document.getElementById('side');

  // ゲーム内（NUI）かどうか。NUI では GetParentResourceName が注入される。
  // Web では未定義なので、この 1 箇所だけで環境差を吸収できる。
  function isInGame() {
    return typeof window.GetParentResourceName === 'function';
  }

  function resName() {
    return isInGame() ? window.GetParentResourceName() : 'ash_guide';
  }

  // 読み込んだセクション定義（pages.js の並び順どおり）
  var SECTIONS = [];
  // 部より上、目次の一番上に単独で出すページ（sections/*.js で pinned: true を付けたもの）
  var PINNED = [];
  // 目次を 1 次元に潰したもの。前後リンクとページ検索に使う
  var FLAT = [];
  // いまのジョブ名・組織名（ゲーム内で Lua から届く。Web では常に null）
  var JOB = null;
  var GANG = null;

  //--- 表示する場所の絞り込み ------------------------------------------------
  // ページ定義に only を書くと、その環境でだけ表示される。
  //   only: 'web'  … Web版だけに出す（参加前の人向けの案内など。ゲーム内では不要）
  //   only: 'game' … ゲーム内だけに出す
  //   未指定       … 両方に出す
  function showsHere(page) {
    if (page.only === 'web') { return !isInGame(); }
    if (page.only === 'game') { return isInGame(); }
    return true;
  }

  // セクション・大見出し・ページに jobs / gangs を書くと、その人にだけ出る。
  //   jobs:  ['mechanic']    … その職業に就いている人だけ
  //   gangs: ['resistance']  … その組織に入っている人だけ
  // 両方書いた場合は、どちらかに当てはまれば出る。
  // 所属はゲーム内でしか分からないので、Web版では必ず隠す。
  // 隠すのは目次からだけで、本文のファイル自体は配られている。
  // 見られて困る内容はここに置かないこと（Web版に出したくないだけなら、
  // 公開するときにそのセクションのファイルを入れなければよい）。
  function allowedByJob(o) {
    if (!o || (!o.jobs && !o.gangs)) { return true; }
    if (!isInGame()) { return false; }
    if (o.jobs && JOB && o.jobs.indexOf(JOB) !== -1) { return true; }
    if (o.gangs && GANG && o.gangs.indexOf(GANG) !== -1) { return true; }
    return false;
  }

  // 表示しないページを落とし、空になったグループも落とす。
  // required（参加前に読む項目）は目次の印に使うので引き継ぐ。
  function filterGroups(groups) {
    return (groups || []).map(function (g) {
      return {
        title: g.title, required: g.required === true, flat: g.flat === true,
        pages: allowedByJob(g)
          ? g.pages.filter(function (p) { return showsHere(p) && allowedByJob(p); })
          : []
      };
    }).filter(function (g) { return g.pages.length > 0; });
  }

  //--- セクションの読み込み --------------------------------------------------
  // 目次はセクションごとに sections/<名前>.js へ分けてある。
  // pages.js の parts（部）に並んだ順で読み込み、その順で表示する。
  // 1 本読めなくても、残りのセクションは表示する（目次が全部消えるより良い）。
  function loadSections(done) {
    var parts = DATA.parts || [];
    var names = [];
    parts.forEach(function (p) {
      (p.sections || []).forEach(function (n) { names.push(n); });
    });
    if (!names.length) { done(); return; }
    var remaining = names.length;

    function finish() {
      remaining -= 1;
      if (remaining > 0) { return; }
      buildTree();
      done();
    }

    names.forEach(function (name) {
      var el = document.createElement('script');
      el.src = 'sections/' + name + '.js';
      el.onload = finish;
      el.onerror = finish;
      document.head.appendChild(el);
    });
  }

  // 読み込み済みの sections/*.js から目次を組み立てる。
  // ジョブが分かったときにもう一度呼ぶので、毎回まっさらにしてから作る。
  function buildTree() {
      var parts = DATA.parts || [];
      SECTIONS = [];
      PINNED = [];
      var registry = window.GUIDE_SECTIONS || {};
      parts.forEach(function (p) {
        (p.sections || []).forEach(function (name) {
          var sec = registry[name];
          // name は本文フォルダ名（pages/<name>/）も兼ねる
          if (!sec) { return; }
          if (!allowedByJob(sec)) { return; }

          var groups = filterGroups(sec.groups);
          // pinned のページは目次の一番上へ移す（大見出しの中には出さない）
          groups.forEach(function (g) {
            g.pages = g.pages.filter(function (pg) {
              if (!pg.pinned) { return true; }
              PINNED.push({ id: pg.id, title: pg.title, dir: name });
              return false;
            });
          });
          groups = groups.filter(function (g) { return g.pages.length > 0; });

          SECTIONS.push({ part: p.title, key: name, title: sec.title,
                          firstRead: sec.firstRead === true, groups: groups });
        });
      });
      // ページが1枚も残らなかったセクションは目次から消す
      SECTIONS = SECTIONS.filter(function (s) { return s.groups.length > 0; });
  }

  function buildFlat() {
    FLAT = [];
    // 目次の一番上のページ。部にもセクションにも属さないので、
    // パンくずと前後リンクは出さない（key の 'pin' がその目印）
    PINNED.forEach(function (p, i) {
      FLAT.push({
        id: p.id, title: p.title,
        group: null, section: null,
        dir: p.dir, key: 'pin-' + i
      });
    });

    SECTIONS.forEach(function (s, si) {
      s.groups.forEach(function (g, gi) {
        g.pages.forEach(function (p) {
          FLAT.push({
            id: p.id, title: p.title,
            group: g.title, section: s.title,
            dir: s.key,               // 本文の置き場所（pages/<dir>/<id>.html）
            key: si + '-' + gi
          });
        });
      });
    });
  }

  function findPage(id) {
    for (var i = 0; i < FLAT.length; i++) { if (FLAT[i].id === id) { return i; } }
    return 0;
  }

  function hasPage(id) {
    for (var i = 0; i < FLAT.length; i++) { if (FLAT[i].id === id) { return true; } }
    return false;
  }

  // URL に # が無いときに開くページ。pages.js の home で指定する。
  // 目次の一番上のページとは別（一番上は「ガイドの使い方」でも、
  // 最初に見せたいのは「このガイドについて」といった使い分けができる）。
  function currentId() {
    var h = (location.hash || '').replace(/^#/, '');
    if (hasPage(h)) { return h; }
    if (DATA.home && hasPage(DATA.home)) { return DATA.home; }
    return FLAT[0].id;
  }

  // ---- サイドバー ----
  function buildSide() {
    // 所属が届いてからもう一度呼ばれる。足すだけだと前の目次が残って
    // 二重になるので、必ず空にしてから組み直す
    tree.innerHTML = '';

    // * が何を指すのかを目次の先頭に書いておく（印だけでは伝わらず、
    // 末尾に置くとスクロールしないと見えないため）
    var hasRequired = SECTIONS.some(function (s) {
      return s.groups.some(function (g) { return g.required; });
    });
    if (!isInGame() && hasRequired) {
      var legend = document.createElement('p');
      legend.className = 'side-legend';
      legend.innerHTML = '<span class="req">*</span> 参加の前に読む項目';
      tree.appendChild(legend);
    }

    var CARET =
      '<svg class="caret" viewBox="0 0 8 10" aria-hidden="true">' +
      '<path d="M1 1l5 4-5 4" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';

    // 部より上に出すページ。押すとそのまま開く（開閉はしない）
    if (PINNED.length) {
      var pins = document.createElement('ul');
      pins.className = 'pinned';
      PINNED.forEach(function (p) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + p.id;
        a.textContent = p.title;
        a.dataset.id = p.id;
        li.appendChild(a);
        pins.appendChild(li);
      });
      tree.appendChild(pins);
    }

    var lastPart = null;

    SECTIONS.forEach(function (s, si) {
      // 部（一番外側のくくり）の見出し。同じ部が続く間は出さない
      if (s.part && s.part !== lastPart) {
        lastPart = s.part;
        var pband = document.createElement('div');
        pband.className = 'part-band';
        pband.textContent = s.part;
        tree.appendChild(pband);
      }

      // 大大見出しも開閉する。開くのは常に1つだけなので、
      // ページが増えても目次の長さが伸びない
      var sec = document.createElement('div');
      sec.className = s.firstRead ? 'sec is-key' : 'sec';
      sec.dataset.open = 'false';
      sec.dataset.si = String(si);

      var total = s.groups.reduce(function (n, g) { return n + g.pages.length; }, 0);
      // 中に「参加の前に読む項目」があれば、閉じていても分かるように印を出す
      var secReq = (!isInGame() && s.groups.some(function (g) { return g.required; }))
        ? '<span class="req" title="参加前に読む項目">*</span>' : '';

      var sbtn = document.createElement('button');
      sbtn.type = 'button';
      sbtn.className = 'sec-band';
      sbtn.setAttribute('aria-expanded', 'false');
      sbtn.innerHTML = CARET + '<span class="sec-name"></span>' + secReq +
        '<span class="sec-count">' + total + '</span>';
      sbtn.querySelector('.sec-name').textContent = s.title;
      sbtn.addEventListener('click', function () { toggleSection(sec); });

      var body = document.createElement('div');
      body.className = 'sec-body';

      sec.appendChild(sbtn);
      sec.appendChild(body);
      tree.appendChild(sec);

      s.groups.forEach(function (g, gi) {
        // flat の大見出しは開閉しない。見出しの行を出さず、ページを直接並べる。
        // ページが1枚しかない大見出しで、名前が二重に出るのを避けるために使う。
        if (g.flat) {
          var flatUl = document.createElement('ul');
          flatUl.className = 'grp-items is-flat';
          g.pages.forEach(function (p) {
            var fli = document.createElement('li');
            var fa = document.createElement('a');
            fa.href = '#' + p.id;
            fa.textContent = p.title;
            fa.dataset.id = p.id;
            fli.appendChild(fa);
            flatUl.appendChild(fli);
          });
          body.appendChild(flatUl);
          return;
        }

        var wrap = document.createElement('div');
        wrap.className = 'grp';
        wrap.dataset.open = 'false';
        wrap.dataset.key = si + '-' + gi;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'grp-btn';
        btn.setAttribute('aria-expanded', 'false');
        // 参加前に読む項目には * を付ける。Web だけ（ゲーム内にいる人は参加済み）
        var mark = (!isInGame() && g.required)
          ? '<span class="req" title="参加前に読む項目">*</span>' : '';
        btn.innerHTML = CARET + '<span class="grp-name"></span>' + mark +
          '<span class="grp-count">' + g.pages.length + '</span>';
        btn.querySelector('.grp-name').textContent = g.title;
        btn.addEventListener('click', function () {
          var open = wrap.dataset.open === 'true';
          wrap.dataset.open = open ? 'false' : 'true';
          btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        });

        var ul = document.createElement('ul');
        ul.className = 'grp-items';
        g.pages.forEach(function (p) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + p.id;
          a.textContent = p.title;
          a.dataset.id = p.id;
          li.appendChild(a);
          ul.appendChild(li);
        });

        wrap.appendChild(btn);
        wrap.appendChild(ul);
        body.appendChild(wrap);
      });
    });
  }

  // 開くのは常に1つの大大見出しだけ。開いたものをもう一度押すと閉じる
  function toggleSection(sec) {
    var willOpen = sec.dataset.open !== 'true';
    Array.prototype.forEach.call(tree.querySelectorAll('.sec'), function (el) {
      var open = (el === sec) && willOpen;
      el.dataset.open = open ? 'true' : 'false';
      el.querySelector('.sec-band').setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function markSide(page) {
    // 読んでいるページの大大見出しを開き、他は閉じる
    var si = String(page.key).split('-')[0];
    Array.prototype.forEach.call(tree.querySelectorAll('.sec'), function (el) {
      var isCur = el.dataset.si === si;
      el.dataset.open = isCur ? 'true' : 'false';
      el.querySelector('.sec-band').setAttribute('aria-expanded', isCur ? 'true' : 'false');
    });
    Array.prototype.forEach.call(tree.querySelectorAll('.grp'), function (wrap) {
      var isCur = wrap.dataset.key === page.key;
      wrap.dataset.open = isCur ? 'true' : 'false';
      wrap.querySelector('.grp-btn').setAttribute('aria-expanded', isCur ? 'true' : 'false');
    });
    Array.prototype.forEach.call(tree.querySelectorAll('.grp-items a, .pinned a'), function (a) {
      if (a.dataset.id === page.id) { a.setAttribute('aria-current', 'page'); }
      else { a.removeAttribute('aria-current'); }
    });
  }

  // ---- 本文 ----
  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;';
    });
  }

  function crumbHTML(page) {
    // 目次の一番上のページはどのセクションにも属さないので、題だけを出す
    if (!page.section) { return '<div class="crumb">' + esc(page.title) + '</div>'; }
    // 目次用の改行はパンくずでは出さない
    return '<div class="crumb">' + esc(String(page.section).replace(/\n/g, '')) + '<span class="sep">›</span>' +
           esc(page.group) + '<span class="sep">›</span>' + esc(page.title) + '</div>';
  }

  // 前後リンクは同じセクション内だけを行き来する
  function pagerHTML(idx) {
    var cur = FLAT[idx];
    var prev = FLAT[idx - 1];
    var next = FLAT[idx + 1];
    if (prev && prev.section !== cur.section) { prev = null; }
    if (next && next.section !== cur.section) { next = null; }

    var html = '<nav class="pager" aria-label="前後のページ">';
    html += prev
      ? '<a class="prev" href="#' + prev.id + '"><span class="dir">← 前のページ</span>' + esc(prev.title) + '</a>'
      : '<span class="spacer"></span>';
    html += next
      ? '<a class="next" href="#' + next.id + '"><span class="dir">次のページ →</span>' + esc(next.title) + '</a>'
      : '<span class="spacer"></span>';
    html += '</nav>';
    html += '<div class="foot"><span>AshDistrict プレイヤーガイド</span>' +
            '<span>版 ' + esc(DATA.version) + '</span>' +
            '<span>最終更新 ' + esc(DATA.updated) + '</span></div>';
    return html;
  }

  var cache = {};

  function render(id) {
    var idx = findPage(id);
    var page = FLAT[idx];
    markSide(page);

    // ページを切り替えたら先頭から見せる。
    // スクロールしているのはゲーム内では .main、Web では画面全体（guide.css の
    // .guide.on-web .main は overflow: visible）。両方戻さないと、下まで読んでから
    // 別のページへ移ったときに途中から表示される。
    function toTop() {
      if (main) { main.scrollTop = 0; }
      window.scrollTo(0, 0);
    }

    function paint(bodyHTML) {
      article.innerHTML = crumbHTML(page) + bodyHTML + pagerHTML(idx);
      toTop();
    }

    if (cache[page.id]) { paint(cache[page.id]); return; }

    // 本文はセクションごとのフォルダに置いてある（pages/<セクション名>/<id>.html）
    fetch('pages/' + page.dir + '/' + page.id + '.html', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) { throw new Error('status ' + res.status); }
        return res.text();
      })
      .then(function (text) { cache[page.id] = text; paint(text); })
      .catch(function () {
        paint('<h2>' + esc(page.title) + '</h2>' +
              '<div class="note">このページを読み込めませんでした。' +
              'ガイドを開き直しても直らない場合はアドミンに知らせてください。</div>');
      });
  }

  // ---- 開閉（ゲーム内のみ。Web では常に表示されている） ----
  function open(pageId) {
    if (pageId) {
      if (location.hash === '#' + pageId) { render(pageId); }
      else { location.hash = '#' + pageId; }
    }
    root.classList.remove('is-hidden');
    if (main) { main.scrollTop = 0; }
  }

  function requestClose() {
    if (!isInGame()) { return; }
    if (root.classList.contains('is-hidden')) { return; }
    root.classList.add('is-hidden');
    // Lua にフォーカス解放を依頼する。呼び出し側への通知も Lua 側が行う
    fetch('https://' + resName() + '/guideClose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
  }

  // ---- 起動 ----
  // セクションの読み込みが終わってから目次と本文を組み立てる
  loadSections(start);

  function start() {
    buildFlat();
    if (!FLAT.length) {
      article.innerHTML = '<h2>目次を読み込めませんでした</h2>' +
        '<div class="note">時間をおいて開き直しても直らない場合はアドミンに知らせてください。</div>';
      root.classList.add(isInGame() ? 'in-game' : 'on-web');
      return;
    }
    buildSide();
    if (isInGame()) {
      // ゲーム内では ui_page として常に読み込まれているので、開かれるまで隠しておく。
      // ページ全体を透明にして、パネルの外はゲーム画面が見えるようにする
      document.documentElement.classList.add('nui');
      root.classList.add('in-game', 'is-hidden');
    } else {
      // index.html の先頭スクリプトが付けているはずだが、そこが動かなかった
      // ときのために付け直す。Web で地の色が抜けると文字が読めなくなる
      document.documentElement.classList.add('web');
      root.classList.add('on-web');
    }
    render(currentId());

    window.addEventListener('hashchange', function () { render(currentId()); });

    document.getElementById('chrome-close').addEventListener('click', requestClose);
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { requestClose(); }
    });

    // Lua からの開く指示（コマンド、または他リソースの exports:Open）
    window.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.action === 'guideOpen') {
        // 所属が変わっていたら、限定セクションの出し分けをやり直す
        var job = d.job || null;
        var gang = d.gang || null;
        if (job !== JOB || gang !== GANG) {
          JOB = job;
          GANG = gang;
          buildTree();
          buildFlat();
          buildSide();
        }
        open(d.page);
      }
    });

    // 狭い画面のドロワー（Web のみ）
    var drawerBtn = document.getElementById('drawer-btn');
    drawerBtn.addEventListener('click', function () {
      var isOpen = drawerBtn.getAttribute('aria-expanded') === 'true';
      drawerBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      side.classList.toggle('is-open', !isOpen);
    });
    tree.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawerBtn.setAttribute('aria-expanded', 'false');
        side.classList.remove('is-open');
      }
    });
  }
})();
