// 【サーバー関連】の目次。参加の前提・世界観・手続きをまとめる。
// 守るべき決まりは sections/rule.js（【ルール】）に分けてある。
// ページを1枚足すときは、このファイルに1行足して pages/server/<id>.html を作る。
// このセクションを表示する順番は pages.js の parts で決まる。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['server'] = {
  // 参加してすぐ読んでほしいので、目次で目立たせる（guide.js が is-key を付ける）
  firstRead: true,
  title: 'サーバー関連',
  groups: [
    {
      title: '概要',
      required: true,
      pages: [
        { id: 'server-about', title: '概要' },
        { id: 'server-join',  title: '参加前確認事項', only: 'web' }
      ]
    },
    {
      title: '世界観',
      required: true,
      pages: [
        { id: 'world-setting',  title: '崩壊後の世界' },
        { id: 'world-factions', title: '勢力と職業' },
        { id: 'world-areas',    title: 'エリア区分' }
      ]
    },
    {
      // 埋もれさせたくないので、手続きの前に単独で置く。
      // 1枚だけなので flat（見出しの行を出さない）
      flat: true,
      pages: [
        { id: 'server-support', title: '支援について' }
      ]
    },
    {
      title: 'Discord での手続き',
      pages: [
        // pinned を付けたページは、部より上（目次の一番上）に単独で出る。
        // ここに書いておけば本文の置き場所（pages/server/）は変わらない。
        { id: 'server-usage',     title: 'ガイドの使い方', pinned: true },
        { id: 'server-ticket',    title: 'チケットの出し方・閉じ方' },
        { id: 'server-discordid', title: 'Discord ID の調べ方' }
      ]
    }
  ]
};
