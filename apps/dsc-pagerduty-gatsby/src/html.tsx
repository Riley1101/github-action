import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  let faqMark = `{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "PagerDutyとは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PagerDutyは監視ツールやアプリケーションからのアラートを受けて、いろいろな方法でインシデントの発生を確実に担当者に通報するシステムです。ダウンタイムやシステムの不正確さから企業を保護するサービスで、他の監視ツールとの統合も可能。チーム全体にとって必要な警告～警報に優先順位を付け、メールやSMS、音声メッセージなどでアラート送信してくれます。"
        }
      },
      {
        "@type": "Question",
        "name": "PagerDutyの費用は?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional プランで21ドル（1ユーザー／月：年払い）、Businessプラン41ドル（1ユーザー／月：年払い）になります。詳しくは<a href='https://pagerduty.digitalstacks.net/pricelist/'> プライスリスト</a>でご確認ください"
        }
      },
      {
        "@type": "Question",
        "name": "14 日間の無料トライアルはどんなことができますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "無料トライアル期間中は、全部の機能が使えて、電話やSMSを無料で送信できます。ご購入するまではクレジットカード登録も不要ですので課金されることはありません。無料トライアルの申し込みは<a href='https://pagerduty.digitalstacks.net/free-trial-2/?icid=mainmenu'>こちら</a>"
        }
      }
    ]
  }`;

  return (
    <html {...props.htmlAttributes} lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta
          name="description"
          content="PagerDutyは監視ツールやアプリケーションからのアラートを受けて,いろいろな方法でインシデントの発生を確実に担当者に通報するシステムです。"
        />
        <meta
          name="og:description"
          content="PagerDutyは監視ツールやアプリケーションからのアラートを受けて,いろいろな方法でインシデントの発生を確実に担当者に通報するシステムです。"
        /> */}
        {/* <meta
          name="keywords"
          content="pagerduty,digitalstacks,日本でのPagerduty,pagerdutyとは,インシデント管理ツールです,pagerdutyの支払いは日本円で,pagerdutyの日本語サポート,pagerdutyインテグレーションガイド,pagerdutyの使い方と技術情報" /> */}
        {props.headComponents}
        <script
          src="https://cdn.speedcurve.com/js/lux.js?id=4277546751"
          defer
          crossOrigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        LUX=(function(){var a=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMarks)?LUX.gaMarks:[]);var d=("undefined"!==typeof(LUX)&&"undefined"!==typeof(LUX.gaMeasures)?LUX.gaMeasures:[]);var j="LUX_start";var k=window.performance;var l=("undefined"!==typeof(LUX)&&LUX.ns?LUX.ns:(Date.now?Date.now():+(new Date())));if(k&&k.timing&&k.timing.navigationStart){l=k.timing.navigationStart}function f(){if(k&&k.now){return k.now()}var o=Date.now?Date.now():+(new Date());return o-l}function b(n){if(k){if(k.mark){return k.mark(n)}else{if(k.webkitMark){return k.webkitMark(n)}}}a.push({name:n,entryType:"mark",startTime:f(),duration:0});return}function m(p,t,n){if("undefined"===typeof(t)&&h(j)){t=j}if(k){if(k.measure){if(t){if(n){return k.measure(p,t,n)}else{return k.measure(p,t)}}else{return k.measure(p)}}else{if(k.webkitMeasure){return k.webkitMeasure(p,t,n)}}}var r=0,o=f();if(t){var s=h(t);if(s){r=s.startTime}else{if(k&&k.timing&&k.timing[t]){r=k.timing[t]-k.timing.navigationStart}else{return}}}if(n){var q=h(n);if(q){o=q.startTime}else{if(k&&k.timing&&k.timing[n]){o=k.timing[n]-k.timing.navigationStart}else{return}}}d.push({name:p,entryType:"measure",startTime:r,duration:(o-r)});return}function h(n){return c(n,g())}function c(p,o){for(i=o.length-1;i>=0;i--){var n=o[i];if(p===n.name){return n}}return undefined}function g(){if(k){if(k.getEntriesByType){return k.getEntriesByType("mark")}else{if(k.webkitGetEntriesByType){return k.webkitGetEntriesByType("mark")}}}return a}return{mark:b,measure:m,gaMarks:a,gaMeasures:d}})();LUX.ns=(Date.now?Date.now():+(new Date()));LUX.ac=[];LUX.cmd=function(a){LUX.ac.push(a)};LUX.init=function(){LUX.cmd(["init"])};LUX.send=function(){LUX.cmd(["send"])};LUX.addData=function(a,b){LUX.cmd(["addData",a,b])};LUX_ae=[];window.addEventListener("error",function(a){LUX_ae.push(a)});LUX_al=[];if("function"===typeof(PerformanceObserver)&&"function"===typeof(PerformanceLongTaskTiming)){var LongTaskObserver=new PerformanceObserver(function(c){var b=c.getEntries();for(var a=0;a<b.length;a++){var d=b[a];LUX_al.push(d)}});try{LongTaskObserver.observe({type:["longtask"]})}catch(e){}};
        `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: faqMark,
          }}
        ></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
