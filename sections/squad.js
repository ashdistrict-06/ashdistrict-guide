// 【スクワッド】の目次。
// スクワッドの仕組みそのものを扱う。ミッションを一緒に受けるときの動きは
// sections/mission.js の「ソロとスクワッド」にある。
// ページを1枚足すときは、このファイルに1行足して pages/squad/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['squad'] = {
  title: 'スクワッド',
  groups: [
    {
      // 群がひとつしかないので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'squad-how',
          title: '使い方'
        },
        {
          id: 'squad-manage',
          title: '抜ける・解散する'
        }
      ]
    }
  ]
};
