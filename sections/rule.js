// 【ルール】の目次。守るべき決まりだけをここに集める。
// 全員に適用される「一般ルール」、所属している人だけの「組織ルール」、
// 戦う場面の決まりである「戦闘系ルール」に分ける。
// ページを1枚足すときは、このファイルに1行足して pages/rule/<id>.html を作る。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['rule'] = {
  // 参加してすぐ読んでほしいので、目次で目立たせる（guide.js が is-key を付ける）
  firstRead: true,
  title: 'ルール',
  groups: [
    {
      // 全員が対象
      title: '一般ルール',
      required: true,
      pages: [
        { id: 'rule-banned',  title: '禁止行為' },
        { id: 'rule-trouble', title: 'トラブルを起こさないために' },
        { id: 'rule-penalty', title: '処分について' },
        { id: 'rule-stream',  title: '配信について' },
        { id: 'rule-citizen', title: 'citizen' }
      ]
    },
    {
      // 所属している人だけが対象
      title: '組織ルール',
      required: true,
      pages: [
        { id: 'org-arc',        title: '軍（ARC）' },
        { id: 'org-resistance', title: 'レジスタンス' },
        { id: 'org-fmu',        title: '救護団体（FMU）' },
        { id: 'org-mechanic',   title: 'メカニック' },
        { id: 'org-corp',       title: '企業・店舗' },
        { id: 'org-dress',      title: '服装' }
      ]
    },
    {
      // 複数の組織にまたがる戦闘の決まり
      title: '戦闘系ルール',
      required: true,
      pages: [
        { id: 'org-pvp',   title: 'PvP・非PvPゾーン' }
      ]
    },
    {
      // 組織どうしがぶつかる場面。参加できる人が決まっていて、
      // 非PvPエリアでも参加者どうしなら戦える。混ぜると見分けが付かないので分けている
      title: 'PvPコンテンツ',
      required: true,
      pages: [
        { id: 'org-scene', title: '特殊物資争奪戦' },
        { id: 'org-board', title: '受注ボード' }
      ]
    }
  ]
};
