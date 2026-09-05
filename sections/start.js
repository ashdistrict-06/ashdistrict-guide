// 【まず何から始めるか】の目次。
// 街に来たばかりの人が、上から順にやることをまとめる。
// キー割り当てやコマンドのような「あとから引くもの」は sections/city.js に置く。
// ページを1枚足すときは、このファイルに1行足して pages/start/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['start'] = {
  // 参加してすぐ読んでほしいので、目次で目立たせる（guide.js が is-key を付ける）
  firstRead: true,
  title: 'まず何から始めるか',
  groups: [
    {
      // 順番に読むものなので、群に分けず並べる（flat＝見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'start-character',
          title: 'キャラクター作成'
        },
        {
          id: 'start-tutorial',
          title: 'チュートリアル'
        },
        {
          id: 'start-phone',
          title: 'スマホ・無線'
        },
        {
          id: 'start-bank',
          title: '銀行'
        }
      ]
    }
  ]
};
