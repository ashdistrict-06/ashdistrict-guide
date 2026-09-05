// ガイドの目次の入口。
//
// ここにあるのは【版数】【最終更新日】【セクションの並び順】だけ。
// 各セクションの中身（大見出し・ページ）は sections/<名前>.js にある。
//
// 一番外側のくくりが【部】。その中に大大見出し（セクション）が並ぶ。
//
// 並べ替えたいとき  … parts の中の sections 配列の順番を入れ替える（表示順が変わる）
// セクションを足すとき … sections/<名前>.js を作り、どれかの部の配列に名前を足す
// 部を足すとき     … parts に { title, sections } を足す
// ページを足すとき   … sections/<名前>.js に1行足して pages/<id>.html を作る
//
// updated は日本時間の作業日を YYYY-MM-DD で書く。
// 本文やセクションを 1 文字でも直したら、その日の日付に書き換える。
// プレイヤーはこの日付を見て「いつの情報か」を判断するので、古いままだと嘘になる。
// 直し忘れると tools/guide_check.lua が注意を出す。
window.GUIDE = {
  version: '2.0.0',
  updated: '2026-09-05',
  // 開いたときに最初に表示するページ（URL に # が付いていないとき）。
  // 目次の一番上に出るページとは別なので注意する。
  home: 'server-about',
  parts: [
    // 部の名前は、中の大大見出しと同じにしない（目次で見分けがつかなくなる）
    { title: '基本事項', sections: ['server', 'rule'] },
    { title: '街での生活', sections: ['start', 'city', 'inventory', 'skill', 'craft', 'shop', 'vehicle', 'affil', 'squad', 'mission'] },
  ],
};
