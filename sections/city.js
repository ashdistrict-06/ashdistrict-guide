// 【街の基本】の目次。
// ミッションやクラフトに限らない、街で遊ぶうえでの共通知識を置く。
// ページを1枚足すときは、このファイルに1行足して pages/city/<id>.html を作る。
// このセクションを表示する順番は pages.js の sections 配列で決まる。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['city'] = {
  title: '街の基本',
  groups: [
    {
      // 最初に読んでほしいので先頭に置く。1枚だけなので flat
      flat: true,
      pages: [
        {
          id: 'city-area',
          title: 'セーフゾーンと外'
        }
      ]
    },
    {
      // 操作の基本。キーとコマンドは ash_commandlist の /cmds が正なので、
      // ここには初期設定と「よく使うもの」だけを置き、全部は載せない。
      title: '操作',
      pages: [
        {
          id: 'city-keys',
          title: 'キー割り当て'
        },
        {
          id: 'city-commands',
          title: 'コマンド'
        }
      ]
    },
    {
      // 1枚だけなので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'city-terms',
          title: 'よく使う言い方'
        }
      ]
    }
  ]
};
