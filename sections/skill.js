// 【スキル】の目次。
// ページを1枚足すときは、このファイルに1行足して pages/skill/<id>.html を作る。
// 車両クラフトのレベルとは別物なので、セクションも分けてある。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['skill'] = {
  title: 'スキル',
  groups: [
    {
      // 群がひとつしかないので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'skill-how',
          title: '使い方'
        },
        {
          id: 'skill-point',
          title: 'スキルポイント'
        }
      ]
    }
  ]
};
