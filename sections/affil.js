// 【所属関連】の目次。ジョブとレジスタンスの所属まわり（/jobm）をまとめる。
// 組織ごとの決まり（ARC / FMU / メカ …）は sections/rule.js にある。
// ページを1枚足すときは、このファイルに1行足して pages/affil/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['affil'] = {
  title: '所属関連',
  groups: [
    {
      // 群がひとつしかないので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'affil-manage',
          title: '所属を管理する'
        },
        {
          id: 'affil-rank',
          title: '階級と人事'
        }
      ]
    }
  ]
};
