/* コメントタイプ */
export class Comment {
  public static readonly REPUTATION_GOOD = 1 // 良い評価
  public static readonly REPUTATION_BAD  = 2 // 悪い評価
}

/* 価格帯 */
class Price {
  public static readonly LESS_THAN_THOUSAND       = 1  // 〜1000
  public static readonly LESS_THAN_TWO_THOUSAND   = 2  // 1000~2000
  public static readonly LESS_THAN_THREE_THOUSAND = 3  // 2000~3000
  public static readonly LESS_THAN_FOUR_THOUSAND  = 4  // 3000~4000
  public static readonly LESS_THAN_FIVE_THOUSAND  = 5  // 4000~5000
  public static readonly LESS_THAN_SIX_THOUSAND   = 6  // 5000~6000
  public static readonly LESS_THAN_SEVEN_THOUSAND = 7  // 6000~7000
  public static readonly LESS_THAN_EIGHT_THOUSAND = 8  // 7000~8000
  public static readonly LESS_THAN_NIGHT_THOUSAND = 9  // 8000~9000
  public static readonly LESS_THAN_TEN_THOUSAND   = 10 // 9000~10000
  public static readonly MORE_THAN_TEN_THOUSAND   = 11 // 10000~
}

export const PriceArray: Array<any> = [
  {
    id: Price.LESS_THAN_THOUSAND,
    name: '￥~1,000'
  },
  {
    id: Price.LESS_THAN_TWO_THOUSAND,
    name: '￥1,000~2,000'
  },
  {
    id: Price.LESS_THAN_THREE_THOUSAND,
    name: '￥2,000~3,000'
  },
  {
    id: Price.LESS_THAN_FOUR_THOUSAND,
    name: '￥3,000~4,000'
  },
  {
    id: Price.LESS_THAN_FIVE_THOUSAND,
    name: '￥4,000~5,000'
  },
  {
    id: Price.LESS_THAN_SIX_THOUSAND,
    name: '￥5,000~6,000'
  },
  {
    id: Price.LESS_THAN_SEVEN_THOUSAND,
    name: '￥6,000~7,000'
  },
  {
    id: Price.LESS_THAN_EIGHT_THOUSAND,
    name: '￥7,000~8,000'
  },
  {
    id: Price.LESS_THAN_NIGHT_THOUSAND,
    name: '￥8,000~9,000'
  },
  {
    id: Price.LESS_THAN_TEN_THOUSAND,
    name: '￥9,000~10,000'
  },
  {
    id: Price.MORE_THAN_TEN_THOUSAND,
    name: '￥10,000~'
  }
]

export class LinkType {
  public static readonly TWITTER   = 1
  public static readonly FACEBOOK  = 2
  public static readonly INSTAGRAM = 3
  public static readonly OTHER     = 4
}

export class OwnerType {
  public static readonly NOTOWNER         = 0
  public static readonly UNAPPROVEDOWNER  = 1
  public static readonly APPROVEDOWNER    = 2
}