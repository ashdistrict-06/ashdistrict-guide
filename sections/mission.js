// 【ミッション】の目次。
// ページを1枚足すときは、このファイルに1行足して pages/mission/<id>.html を作る。
// このセクションを表示する順番は pages.js の sections 配列で決まる。
//
// 2026-08-28: 項目が多すぎたので短いページを統合した（26枚 → 21枚）。
//   obj-item        → obj-collect（収集・納品）に統合
//   obj-talk        → obj-location（移動・会話・調査）に統合
//   obj-investigate → obj-location に統合
//   party-solo      → party-how（ソロとスクワッド）に統合
//   party-squad     → party-how に統合
//   reward-voucher  → reward-kinds（報酬の種類）に統合
//   basic-types     → basic-accept（受注の流れ）に統合
//   basic-exclusive → basic-cooldown（早い者勝ちとクールダウン）に統合
// 統合したページは、まとまりごとに <h2> を並べて区切っている（server-join と同じ形）。
window.GUIDE_SECTIONS = window.GUIDE_SECTIONS || {};
window.GUIDE_SECTIONS['mission'] = {
  title: 'ミッション',
  groups: [
    {
      // 1枚だけなので flat（見出しの行を出さない）
      flat: true,
      pages: [
        {
          id: 'mission-what',
          title: 'ミッションとは'
        }
      ]
    },
    {
      title: 'ミッションの基本',
      pages: [
        {
          id: 'basic-accept',
          title: '受注の流れ'
        },
        {
          id: 'basic-board',
          title: '掲示板の見かた'
        },
        {
          id: 'basic-tracker',
          title: 'トラッカー（F5）'
        },
        {
          id: 'basic-cooldown',
          title: '早い者勝ちとクールダウン'
        },
        {
          id: 'basic-abandon',
          title: '断念・放置・回線落ち'
        }
      ]
    },
    {
      // 1枚だけなので flat。群の見出しがない分、ページ題を「ソロとスクワッド」にしてある
      flat: true,
      pages: [
        {
          id: 'party-how',
          title: 'ソロとスクワッド'
        }
      ]
    },
    {
      title: '目標のやり方',
      pages: [
        {
          id: 'obj-kill',
          title: '討伐（接近 → 撃破）'
        },
        {
          id: 'obj-collect',
          title: '収集・納品'
        },
        {
          id: 'obj-location',
          title: '移動・会話・調査'
        }
      ]
    },
    {
      title: '報酬',
      pages: [
        {
          id: 'reward-report',
          title: '報告して受け取る'
        },
        {
          id: 'reward-kinds',
          title: '報酬の種類'
        }
      ]
    },
    {
      title: 'メインストーリー',
      pages: [
        {
          id: 'story-recorder',
          title: '記録者と章選択'
        },
        {
          id: 'story-phase',
          title: 'Phase とワイプ'
        },
        {
          id: 'story-sub',
          title: 'サブミッション'
        }
      ]
    },
    {
      title: 'ジョブミッション',
      pages: [
        {
          id: 'job-basic',
          title: 'ジョブミッションの基本'
        },
        {
          id: 'job-list',
          title: 'ARC / FMU / メカ'
        }
      ]
    },
    {
      title: 'その他',
      pages: [
        {
          id: 'etc-faq',
          title: 'よくある質問'
        },
        {
          id: 'etc-glossary',
          title: '用語集'
        }
      ]
    }
  ]
};
