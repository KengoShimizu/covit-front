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
  public static readonly NOT_OWNER         = 0
  public static readonly UNAPPROVED_OWNER  = 1
  public static readonly APPROVED_OWNER    = 2
}

export class RedirectFrom {
  public static readonly NEW_COMMENT = 'new_comment'
  public static readonly HISTORY = 'history'
}

export class RouteName {
  public static readonly ROOT                     = '/'
  public static readonly MENU                     = '/menu'
  public static readonly SHOP                     = '/shops/:id'
  public static readonly SHOP_COMMENTS            = '/shops/:id/comments'
  public static readonly PRIVACY                  = '/privacy'
  public static readonly LOGIN                    = '/accounts/login'
  public static readonly REGISTER                 = '/accounts/register'
  public static readonly REGISTER_EMAIL           = '/accounts/register/email'
  public static readonly SEND                     = '/accounts/send'
  public static readonly USER_COMMENTS            = '/users/:id/comments'
  public static readonly REQUEST_TOP              = '/owners/request/top'
  public static readonly COMMENTS_NEW             = '/shops/:id/comments/new'
  public static readonly SHOP_SEARCH_FOR_COMMENTS = '/comments/shop/search'
  public static readonly OWNER_SHOP_FORM          = '/owners/request/form'
  public static readonly HISTORY                  = '/history'
  public static readonly ACCOUNT_TOP              = '/accounts'
  public static readonly OWNER_ACCOUNT_TOP        = '/owner/accounts'
  public static readonly SELF_COMMENTS            = '/accounts/comments'
  public static readonly EDIT_LOGIN               = '/accounts/edit/login'
  public static readonly EDIT_PROFILE             = '/accounts/edit/profile'
  public static readonly EDIT_EMAIL               = '/accounts/edit/email'
  public static readonly ADD_EMAIL                = '/accounts/add/email'
  public static readonly USER_SHOP_FORM           = '/users/request/form'
  public static readonly LANDING_PAGE             = 'https://coveat-service.studio.design'
}