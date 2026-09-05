// 【物資関連】の目次。ルート・リサイクラー・クラフトをまとめる。
// ページを1枚足すときは、このファイルに1行足して pages/craft/<id>.html を作る。
// このセクションを表示する順番は pages.js の sections 配列で決まる。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['craft'] = {
  title: '物資関連',
  groups: [
    // 集める → 分解する → 作る、の順に並べる
    {
      title: 'ルート',
      pages: [
        {
          id: 'loot-basic',
          title: '使い方'
        },
        {
          id: 'loot-junk',
          title: '出るジャンク品'
        }
      ]
    },
    {
      // 1枚だけなので flat（見出しの行を出さない）。
      // 群の見出しがない分、ページ題のほうを「リサイクラー」にしてある
      flat: true,
      pages: [
        {
          id: 'recycle-how',
          title: 'リサイクラー'
        }
      ]
    },
    {
      title: 'クラフト',
      pages: [
        {
          id: 'craft-how',
          title: '使い方'
        },
        {
          id: 'craft-stations',
          title: '作業台の種類'
        }
      ]
    },
    {
      // 1枚だけなので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'airdrop',
          title: 'エアドロップ'
        }
      ]
    }
  ]
};
