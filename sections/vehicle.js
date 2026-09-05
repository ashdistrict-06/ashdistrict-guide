// 【車両】の目次。
// 修理・給油・ガレージ・車両クラフトをまとめる。
// ページを1枚足すときは、このファイルに1行足して pages/vehicle/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['vehicle'] = {
  title: '車両関連',
  groups: [
    {
      // 1枚ずつなので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'vehicle-repair',
          title: '修理'
        },
        {
          id: 'vehicle-fuel',
          title: '給油'
        },
        {
          id: 'vehicle-garage',
          title: 'ガレージ'
        }
      ]
    },
    {
      // 2枚あるので群にする
      title: '車両クラフト',
      pages: [
        {
          id: 'vehicle-how',
          title: '使い方'
        },
        {
          id: 'vehicle-build',
          title: '建造の進め方'
        }
      ]
    }
  ]
};
