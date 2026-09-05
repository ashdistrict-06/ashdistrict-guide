// 【インベントリ】の目次。持ち物・装備・体の状態をまとめる。
// ページを1枚足すときは、このファイルに1行足して pages/inventory/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['inventory'] = {
  title: 'インベントリ',
  groups: [
    {
      // flat: 見出しの行を出さず、ページを直接並べる（開閉しない）。
      // ページが1枚しかないので、見出しとページ名が二重に出るのを避ける
      flat: true,
      pages: [
        { id: 'inv-overview', title: '画面の見かた' }
      ]
    },
    {
      title: 'GEAR',
      pages: [
        { id: 'inv-gear',   title: '持ち物と装備' },
        { id: 'inv-weapon', title: '武器について' }
      ]
    },
    {
      title: 'HEALTH',
      pages: [
        { id: 'inv-health', title: '体の状態' },
        { id: 'inv-treat',  title: '治療について' }
      ]
    },
    {
      title: 'ダウン',
      pages: [
        { id: 'inv-down', title: 'ダウンすると' },
        { id: 'inv-drop', title: '落とすもの・残るもの' }
      ]
    }
  ]
};
