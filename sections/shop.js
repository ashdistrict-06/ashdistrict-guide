// 【購入・販売】の目次。
// 街の中で物を売り買いする手段をまとめる。
// ページを1枚足すときは、このファイルに1行足して pages/shop/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['shop'] = {
  title: '購入・販売',
  groups: [
    {
      // 群がひとつしかないので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'shop-register',
          title: 'レジ'
        },
        {
          id: 'shop-trader',
          title: '放浪商人'
        },
        {
          id: 'shop-market',
          title: 'グローバルマーケット'
        }
      ]
    }
  ]
};
