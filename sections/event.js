// 【イベント】の目次。期間限定で開催するイベントを置く。
// ページを1枚足すときは、このファイルに1行足して pages/event/<id>.html を作る。
// このセクションを表示する順番は pages.js の sections 配列で決まる。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['event'] = {
  title: 'イベント',
  groups: [
    {
      // 道路の廃車やがれきを片付けるイベント（ash_roadclean）。
      // ゲーム画面では「道路清掃」と出るが、ガイドでは「街復興」と呼ぶ（2026-10-30 決定）
      title: '街復興',
      pages: [
        {
          id: 'event-revival',
          title: '開催の流れ'
        },
        {
          id: 'event-revival-how',
          title: '片付け方と報酬'
        }
      ]
    }
  ]
};
