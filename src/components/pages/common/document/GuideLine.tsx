import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';
import Text, { TextThemes } from '../../../atoms/Text';
import { X } from 'react-feather';

const propStyle = {
  privacy: {
    maxWidth: '4oem',
    textAlign: 'justify',
    fontSize: '14px'
  }
};

const GuideLine: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="口コミ投稿のガイドライン" prevRef='#' history={props.history}>
      <div className="content">
        <section className="privacy-section">
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
          covEATに投稿された感染対策の評価や感想は、感染症拡大の中でユーザー様のお店選びの参考にしていただくとともに、飲食店の今後の対策の参考としていただくことを目的としています。<br/>
          <br/>
          その為、ユーザーの皆様には満足した内容だけでなく不満だった内容も忌憚なく投稿していただきたいと考えております。そこで、健全な運営を行うために評価・コメントを投稿する際のガイドラインを規定させていただきました。ユーザーの皆様には、本ガイドラインの順守にご協力いただきたく思います。<br/>
          <br/>
          本ガイドライン及び利用規約に違反する、または運営側が不適切と判断した評価やコメントについては、ユーザー様へ修正のお願いや予告なく削除させていただく場合がありますのであらかじめご了承ください。<br/>
          口コミの文章に関しては、ユーザー様ご自身での原本の保管・バックアップ等をしていただくことをお勧めいたします。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            実際にご飲食されたお店の感想を、わかりやすく投稿してください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            covEATは感染対策をしているお店を他のユーザー様におすすめするためのサービスです。実際にご飲食されたのお店の感染対策の感想を、他のユーザー様にもわかりやすい内容で投稿してください。
            また、
          </Text>
          <ul className="privacy-list">
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              伏せ字や暗号などを用いて書かれたもの
            </li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              感染対策と関係ないことが投稿の大部分を占めるもの
            </li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              実際に利用していないお店の感想
            </li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            お店に悪影響を与える可能性があり、かつ事実の確認が難しいコメントはご遠慮ください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            covEATでは投稿された内容の事実確認を行っておりません。
            お店へ悪影響を与える可能性があり、かつ事実の確認が難しいコメントの投稿はご遠慮下さい。
            なお、店舗の関係者や他のユーザー様から事実誤認である報告があった場合には当該評価・コメント除する場合がございます。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            攻撃的・断定的な表現は避け、節度ある投稿をお願い致します
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            covEATでは感染対策への不満の内容も投稿していただけますが、他のユーザー様やお店に配慮した表現をお願い致します。運営側が不適切であると判断した場合には当該評価・コメントを削除する場合がございます。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            著作権等の知的財産権を侵害する投稿を禁止します
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            自身で書いたものではなく、第三者が書いた文章を投稿することは著作権の侵害に当たる恐れがあるためご注意ください。<br/>
            雑誌、書籍等から引用する場合は引用部分とコメントを明確に分離し出典を明記の上投稿してください。
            引用が第三者の権利を侵害していないか当社では一切責任を負いませんので、予めご了承ください。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            個人への誹謗中傷やプライバシーを侵害する投稿を禁止します
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            店舗関係者や他のお客様、他のユーザー様等、第三者の個人情報に関する投稿はプライバシーの侵害に該当する場合があるためご注意ください。
            また、特定/非特定に関わらず個人を誹謗中傷する行為を禁止します。
          </Text>
          <ul className="privacy-list">
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              他のコメント投稿者への誹謗中傷
            </li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              他の来店客への誹謗中傷
            </li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              店員の接客態度への誹謗中傷
            </li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            対価を受け取ることを目的とした投稿を禁止します
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            covEATでは金銭又はそれに相当するものを得ることを目的に評価・コメントを投稿することを禁止しています。発覚した場合には、投稿の削除、アカウントの凍結等の処置をとる場合がございます。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            該当店舗の関係者の方は、店舗の営利を目的とする口コミの投稿はご遠慮ください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            店舗の運営、またその関係者の方が当該関係店舗に対して営利を目的とする投稿はご遠慮ください。発覚した場合には、投稿の削除、アカウントの凍結等の処置をとる場合がございます。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            飲食店ではない店舗の投稿はご遠慮ください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            運営側が投稿された店舗が飲食店ではないと判断した場合、予告なく店舗ページ及び投稿の削除を行う場合がございます。予めご了承ください。
          </Text>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            お店への個人的なクレームやトラブルに関する投稿はご遠慮ください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            個人的なクレームやトラブルに関する投稿はごß慮ください。
          </Text>
          <ul className="privacy-list">
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              オーダーした内容と異なっていた</li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              会計の料金を間違えられた</li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            お店の法令違反や衛生管理面のクレームはしかるべき当局へご連絡ください
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            お店が法律に違反した行為を行っていた場合や被害に関する内容はしかるべき当局にご連絡ください。<br/>
            また、食中毒や異物の混入、虫の存在など衛生面に関するクレームは事実関係の確認が難しく、お店に大きな損害を与える可能性がありますので、投稿はご遠慮いただき、しかるべき当局へご連絡ください。
          </Text>
          <ul className="privacy-list">
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              オーダーした内容と異なっていた</li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              法に抵触するサービスを行っていた</li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              料理に異物が混入していた</li>
          </ul>
        </section>
        <section className="privacy-section">
          <h2 className="privacy-title">
            法令に反する行為や迷惑行為に関する投稿を禁止します
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
            法令を違反する行為、犯罪行為、迷惑行為、危険行為を行ったことに関する投稿やこれらを助長する投稿を禁止します。
          </Text>
          <ul className="privacy-list">
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              駐車場がなかったので路上駐車をした</li>
            <li className="privacy-option">
              <X size={14} color="#8C8C8C" style={{marginRight:'8px'}}/>
              料金を支払わずに帰ったが大丈夫だった</li>
          </ul>
        </section>
        {/* FIXME */}
        {/* <section className="privacy-section">
          <h2 className="privacy-title">
            ご不明な点はお気軽にお問い合わせください。
          </h2>
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
          お問い合わせフォーム
          </Text>
        </section> */}
        <section className="privacy-section">
          <Text theme={[TextThemes. TEXT]} propStyle={propStyle.privacy}>
          2020年9月7日制定<br/>
          covEAT運営
          </Text>
        </section>
      </div>
      <style jsx>{`
        .content {
          width: 100%;
          padding: 40px 16px;
          box-sizing: border-box;
        }
        .privacy-section{
          max-width: 32em;
          margin: 0 auto 60px auto;
        }
        .privacy-title{
          font-size: ${CommonStyle.SubTitle};
          line-height: 1.5em;
          color: ${CommonStyle.AccentColor};
          margin-bottom: 16px;
        }
        .privacy-list{
          width: 100%;
          line-height: 1.7em;
          margin-top: 16px;
        }
        .privacy-option{
          position: relative;
          font-size: ${CommonStyle.Caption};
          color: ${CommonStyle.TextBlack};
          display: flex;
          align-items: center;
        }
        
      `}</style>
    </HomeLayout>
  );
}

export default GuideLine;