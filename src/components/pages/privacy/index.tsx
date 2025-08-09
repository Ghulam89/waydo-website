"use client";

import classNames from "classnames";
import styles from "./privacy.module.css";

export default function Privacy() {
  const pageIndex = [
    {
      name: "Who we are and how to contact us",
      id: "how-to-contact-us"
    },
    {
      name: "Personal data we collect from you",
      id: "personal-data"
    },
    {
      name: "Personal data we collect from other sources",
      id: "data-from-other-source"
    },
    {
      name: "How we use your personal data and why",
      id: "personal-data-usage"
    },
    {
      name: "Who we share your personal data with",
      id: "personal-data-share"
    },
    {
      name: "How we keep your personal data secure",
      id: "personal-data-secure"
    },
    {
      name: "How long we store your personal data",
      id: "store-personal-data"
    },
    {
      name: "Your rights in relation to your personal data",
      id: "rights-to-personal-data"
    },
    {
      name: "Marketing Communications",
      id: "marketing-communications"
    },
    {
      name: "Our policy on minors",
      id: "policy-on-minor"
    },
    {
      name: "Third party links",
      id: "third-party-links"
    },
    {
      name: "Changes to this privacy policy",
      id: "changes-to-privacy-policy"
    },
  ]

  const handleScrollToSection = (item: Record<string, unknown>) => {
    const element = document.getElementById(item.id as string);
    element && element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.muiStyleLtr1u21icz}>
      <p
        className={styles['mui-style-ltr-zx8a2']}
        data-testid="privacy-current-page"
      >
        Privacy Policy
      </p>
      <p
        className={styles["mui-style-ltr-16b14xt"]}
      >
        Effective Date : &nbsp;
        <span className={styles["mui-style-ltr-17prdac"]}>
          6 February 2024
        </span>
      </p>
      <p className={styles["mui-style-ltr-5bs74m"]}>
        What does this privacy policy cover?
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        Your privacy is extremely important to{" "}
        <a
          className={classNames([
            styles["MuiTypography-inherit"],
            styles["MuiLink-root MuiLink-underlineAlways"],
            styles["mui-style-ltr-2jyucd"],
          ])}
          href="https://www.Waydo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Waydo
        </a>
        . We are committed to protecting your Personal Data (as that term is
        defined further below). We want to be transparent with you about how we
        collect and use your Personal Data in making our website and mobile
        applications (&quot;
        <span className={styles["mui-style-ltr-1esqlmi"]}>
          Platform
        </span>
        &quot;) available to you and tell you about your privacy rights and how the
        law protects you.
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        This Privacy Policy aims to give you information on how Waydo
        collects and processes your Personal Data through your use of this
        Platform.
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        By using the Platform, you agree to the collection, use and transfer of
        your Personal Data as set out in this Privacy Policy.
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        With that in mind, this Privacy Policy covers the following:
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        <ul className={styles["mui-style-ltr-f6u4m3"]}>
          {pageIndex.map((item, i) => (
            <li
              key={i}
              className={styles["MuiListItem-root"]}
              onClick={() => handleScrollToSection(item)}
            >
              <p className={styles["mui-style-ltr-1pjqj74"]}>
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        <span className={styles["mui-style-ltr-17prdac"]}>
          We may revise this Privacy Policy from time to time, with or without
          notice to you.
        </span>{" "}
        If that happens, the new version of this Privacy Policy will be made
        available on this page.
      </p>
      <p className={styles["mui-style-ltr-1ddiinb"]}>
        This Privacy Policy may be published in different languages. If that is
        the case and there are any inconsistencies between versions, the English
        language version will prevail.
      </p>
      <div id="how-to-contact-us" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Who we are and how to contact us
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Who we are
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          <span className={styles["mui-style-ltr-17prdac"]}>
            Waydo Middle East FZ LLC&nbsp;
          </span>
          operates the Platform and is therefore the controller of your Personal
          Data (referred to as either&nbsp;&quot;
          <span className={styles["mui-style-ltr-1esqlmi"]}>
            Waydo
          </span>
          &quot;,&nbsp;&quot;
          <span className={styles["mui-style-ltr-1esqlmi"]}>
            we
          </span>
          &quot;,&nbsp;&quot;
          <span className={styles["mui-style-ltr-1esqlmi"]}>
            us
          </span>
          &quot; or&nbsp;&quot;
          <span className={styles["mui-style-ltr-1esqlmi"]}>
            our
          </span>
          &quot; in this Privacy Policy). Our address is 7th Floor, Building 3, Dubai
          Design District, Dubai, United Arab Emirates.
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          How to contact us
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          You can contact us by emailing:&nbsp;
          <a
            href="mailto:privacy@Waydo.com"
            className={styles["mui-style-ltr-2jyucd"]}
          >
            privacy@Waydo.com
          </a>.
        </p>
      </div>
      <div id="personal-data" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Personal data we collect from you
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          The Personal Data we collect directly from you is outlined in the
          table below.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          &quot;
          <span className={styles["mui-style-ltr-1esqlmi"]}>
            Personal Data
          </span>
          &quot;&nbsp;is information about an individual from which that individual
          is either directly identified or can be identified. It does{" "}
          <span className={styles["mui-style-ltr-17prdac"]}>
            not
          </span>{" "}
          include ‘anonymised data’ (which is information where the identity of
          an individual has been permanently removed). However, it{" "}
          <span className={styles["mui-style-ltr-17prdac"]}>
            does
          </span>{" "}
          include ‘pseudonymised data’ (which is information which alone doesn’t
          identify an individual but, when combined with additional information,
          could be used to identify an individual).&nbsp;
        </p>
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root mui-style-ltr-rhfq9i">
          <table className={styles["mui-style-ltr-19hkf77"]}>
            <thead className="MuiTableHead-root mui-style-ltr-1wbz3t9">
              <tr className="MuiTableRow-root MuiTableRow-head mui-style-ltr-1b1sprc">
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Category of Personal Data
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                  colSpan={2}
                >
                  What this means
                </th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root mui-style-ltr-1xnox0e">
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Identity Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <p className={styles["mui-style-ltr-1ddiinb"]}>
                    First name, last name, username or similar identifier and
                    profile photo.
                  </p>
                  <p className="mui-style-ltr-lhw219">
                    In the event you decide to verify your account using our
                    ‘Waydo Verified’ feature, we will also process a copy of
                    your Identification Card with all information included on it
                    (including your Identification Card number, date of birth,
                    nationality, and gender). We use robust measures keep this
                    information secure to prevent any fraudulent or malicious
                    actions such as identity theft, phishing scams, non-delivery
                    and payment scams.
                  </p>
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contact Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Email address, telephone number(s).
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Location Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Approximate location if you enable this feature via your
                  device.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Listings Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Details about your previous and current listings on the
                  Platform, as well as details of other users’ listings that you
                  have viewed, and offers you have made for other users’
                  listings.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Marketing Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Your preferences in receiving marketing messages from us.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Chat Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Details of messages that you exchange with other users of the
                  Platform through the ‘Chat’ feature, including any additional
                  Personal Data you may disclose in such messages.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Call Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Recordings of calls between you and our teams, which are
                  recorded for monitoring and training purposes.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Behavioural Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Inferred or assumed information relating to your behaviour and
                  interests based on your activity on the Platform. This is most
                  often collated and grouped into ‘segments’ on an aggregated
                  basis.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Technical Data
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Internet protocol (IP) address, login data, browser type and
                  version, time zone setting and location, browser plug-in types
                  and versions, operating system and platform and other
                  technology on the devices you use to access this website or
                  use our services.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Aggregated data
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We also collect, use and share ‘aggregated data’, such as statistical
          or demographic data for a number of purposes. Aggregated data may be
          derived from your Personal Data, but once in aggregated form it will
          no longer constitute Personal Data as this data does not directly or
          indirectly reveal your identity. For example, we may aggregate your
          Behavioural Data to calculate the percentage of users accessing a
          specific Platform feature. However, if we combine or connect
          aggregated data with your Personal Data so that it can directly or
          indirectly identify you, we treat the combined data as Personal Data
          which will be used in accordance with this Privacy Policy.
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Special categories of personal data
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We do not knowingly collect any ‘special categories of personal data’
          about you (this includes, for example, details about your race or
          ethnicity, religious or philosophical beliefs, political opinions,
          information about your health, genetic and/or biometric data, and
          information about criminal offences and convictions).
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We advise you not to share any of that data with us (for example,
          through our support chat function) or other users of the Platform (for
          example, through the user-to-user chat function). However, should you
          choose to share such data with us or other users of the Platform, you
          consent to us processing such data in accordance with this Privacy
          Policy.
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          What happens if you refuse to provide necessary Personal Data?
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          You do not have to provide any Personal Data to us. However, where we{" "}
          <span className="mui-style-ltr-1u4nb7e">
            need
          </span>{" "}
          to process your Personal Data either to grant you access to the
          Platform or to comply with applicable law, and you fail to provide
          that Personal Data when requested, we may not be able to provide you
          access to the Platform. For example, we{" "}
          <span className="mui-style-ltr-1u4nb7e">
            need
          </span>{" "}
          your email address in order to register your account on the Platform.
        </p>
      </div>
      <div id="data-from-other-source" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Personal data we collect from other sources
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          In addition to the Personal Data that we collect directly from you (as
          described in the section immediately above this one), we also collect
          certain of your Personal Data from third party sources. These sources
          are set out in the table below.
        </p>
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root mui-style-ltr-rhfq9i">
          <table className={styles["mui-style-ltr-19hkf77"]}>
            <thead className="MuiTableHead-root mui-style-ltr-1wbz3t9">
              <tr className="MuiTableRow-root MuiTableRow-head mui-style-ltr-1b1sprc">
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Third party source
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                  colSpan={2}
                >
                  Categories of Personal Data
                </th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root mui-style-ltr-1xnox0e">
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Social media platforms
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Our affiliates
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Marketing Data
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Analytics providers
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={classNames([
                    styles["mui-style-ltr-f6u4m3"],
                    styles["mui-style-ltr-1u21icz"]
                  ])}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Behavioural Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Technical Data
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Advertisers
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Behavioural Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Technical Data
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="personal-data-usage" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          How we use your personal data and why
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We will only use your Personal Data for the purposes for which we
          collected it as listed below, unless we reasonably consider that we
          need to use it for another reason and that reason is compatible with
          the original purpose. If we need to use your Personal Data for an
          unrelated purpose, we will update this Privacy Policy and we will
          explain the legal basis which allows us to do so (please refer to the
          ‘Changes to this Privacy Policy’ section further below).
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          What is our ‘legal basis’ for processing your Personal Data?
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          In respect of each of the purposes for which we use your Personal
          Data, applicable privacy laws require us to ensure that we have a
          ‘legal basis’ for that use. Most commonly, we will rely on one of the
          following legal bases:
        </p>
        <ul className={styles["mui-style-ltr-f6u4m3"]}>
          <li
            className={styles["MuiListItem-root"]}
          >
            Where we need to process your Personal Data to meet our contractual
            obligations to you (for example, to provide you access to the
            Platform) (&quot;
            <span className={styles["mui-style-ltr-1esqlmi"]}>
              Contractual Necessity
            </span>
            &quot;).
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            Where we need to process your Personal Data to comply with our legal
            or regulatory obligations (&quot;
            <span className={styles["mui-style-ltr-1esqlmi"]}>
              Compliance with Law
            </span>
            &quot;).
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            Where we have your consent to process your Personal Data for a
            specific purpose (&quot;
            <span className={styles["mui-style-ltr-1esqlmi"]}>
              Consent
            </span>
            &quot;).
          </li>
        </ul>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We have set out below, in a table format, the legal bases we rely on
          when processing your Personal Data.
        </p>
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root mui-style-ltr-rhfq9i">
          <table className={styles["mui-style-ltr-19hkf77"]}>
            <thead className="MuiTableHead-root mui-style-ltr-1wbz3t9">
              <tr className="MuiTableRow-root MuiTableRow-head mui-style-ltr-1b1sprc">
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Purpose
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Categories of Personal Data
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Why we do this
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Our legal basis
                </th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root mui-style-ltr-1xnox0e">
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Account creation
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To register you as a user on the Platform and manage your user
                  account.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contractual Necessity
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Verification
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To verify your account through ‘Waydo Verified’ if you
                  choose to do so.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contractual Necessity
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Operation of our services
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Location Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Listings Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Chat Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Call Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <p className={styles["mui-style-ltr-1ddiinb"]}>
                    To operate the Platform and enable your use of the Platform,
                    including by allowing you to interact with other users of
                    the Platform.
                  </p>
                  <p className="mui-style-ltr-lhw219">
                    To deliver other services that you have requested from us
                    (including, for example, arranging a test drive through
                    Waydo Cars).{" "}
                  </p>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contractual Necessity
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Analytics
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Behavioural Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Technical Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To understand how you and other users use the Platform and to
                  segment our userbase into groups for marketing purposes.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contractual Necessity
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Marketing
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Marketing Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To send you marketing messages, where you have agreed to
                  receive them.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Consent
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Troubleshooting
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Technical Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To track issues that might be occurring on our Platform and to
                  address them.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Contractual Necessity
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Fraud prevention
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <ul className={styles["mui-style-ltr-f6u4m3"]}>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Identity Data
                    </li>
                    <li
                      className={styles["MuiListItem-root"]}
                    >
                      Contact Data
                    </li>
                  </ul>
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  To keep our Platform and associated systems operational and
                  secure.
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Compliance with Law
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="personal-data-share" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Who we share your personal data with
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          The table below describes who we may share your Personal Data with and
          why we share it.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We require all recipients of your Personal Data to implement
          appropriate security measures to adequately protect it, consistent
          with our policies and any data security obligations applicable to us.
          We do not permit our third-party service providers who process your
          Personal Data on our behalf to use it for their own purposes, and only
          permit them to process your Personal Data for specified purposes in
          accordance with our instructions.
        </p>
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root mui-style-ltr-rhfq9i">
          <table className={styles["mui-style-ltr-19hkf77"]}>
            <thead className="MuiTableHead-root mui-style-ltr-1wbz3t9">
              <tr className="MuiTableRow-root MuiTableRow-head mui-style-ltr-1b1sprc">
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Recipients
                </th>
                <th
                  className={styles["mui-style-ltr-q2r97h"]}
                  scope="col"
                >
                  Why we share it
                </th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root mui-style-ltr-1xnox0e">
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Other users of the Platform
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  <p className={styles["mui-style-ltr-1ddiinb"]}>
                    We need to share some of your Personal Data with other users
                    of the Platform when you wish to transact with them through
                    the Platform.
                  </p>
                  <p className={styles["mui-style-ltr-1ddiinb"]}>
                    By placing an advert or submitting a review/rating on our
                    Platform, that information and any Personal Data associated
                    with your account profile (including your username, profile
                    picture and Waydo Verified status) will be publicly
                    accessible to, and may be copied and shared externally by,
                    all other users of our Platform. Such information may also
                    appear in third party search engine results (for example,
                    Google search results). Please ensure that you are
                    comfortable with such information being publicly available
                    before submitting it on our Platform.
                  </p>
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Service providers
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Our service providers provide us with a range of services
                  which are necessary for the operation of the Platform (for
                  example, IT, system administration services, or marketing
                  services), and may have access to your Personal Data as a
                  result.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Our affiliates
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Waydo is part of the Waydo Group, which operates other
                  consumer platforms and share technology with Waydo. Our
                  affiliated companies may require access to your Personal Data
                  as they help us operate the Platform and manage user data.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Professional advisers
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Our lawyers, bankers, auditors, insurers and other advisers
                  may require limited access to your Personal Data when they
                  provide consultancy, banking, legal, insurance and accounting
                  services to us.
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Public authorities
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Public authorities may require us to disclose user data to
                  them under certain circumstances, where required by law (for
                  example, in the event of a police investigation).
                </td>
              </tr>
              <tr className="MuiTableRow-root mui-style-ltr-1b1sprc">
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  Acquirer(s)
                </td>
                <td className={styles["mui-style-ltr-n0s3ot"]}>
                  We may share your Personal Data with third parties in the
                  event of any reorganisation, merger, sale, joint venture,
                  assignment, transfer or other disposition of all or any
                  portion of our business, so that any potential acquirer(s) may
                  continue operating the Platform. Where that is the case, we
                  will ensure that any such recipient(s) continue to use your
                  Personal Data in accordance with this Privacy Policy.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Data transfers
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We may transfer your Personal Data to jurisdictions outside of the
          country in which you are located that may not be deemed to provide the
          same level of data protection as your home country, as necessary for
          the purposes set out in this Privacy Policy. We will always ensure
          that any such cross-border transfers of your Personal Data comply with
          applicable requirements.
        </p>
      </div>
      <div id="personal-data-secure" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          How we keep your personal data secure
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We have put in place appropriate security measures to prevent your
          Personal Data from being accidentally lost or altered, or used or
          accessed in an unauthorised way.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We limit access to your Personal Data to those employees and other
          staff who have a business need to have such access. All such persons
          are subject to a contractual duty of confidentiality.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We have put in place procedures to deal with any actual or suspected
          Personal Data breach. In the event of any such breach, we have systems
          in place to mitigate any impact to your privacy and to work with
          relevant regulators.
        </p>
      </div>
      <div id="store-personal-data" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          How long we store your personal data
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We will only retain your Personal Data for as long as we reasonably
          need to use it for the purposes set out in this Privacy Policy, unless
          a longer retention period is required by applicable law (for example,
          for regulatory purposes).
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Under some circumstances, we may anonymise your Personal Data so that
          it can no longer be associated with you. We may retain such anonymised
          data indefinitely.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Our data retention policies are reviewed at regular intervals and
          comply with all applicable requirements.
        </p>
      </div>
      <div id="rights-to-personal-data" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Your rights in relation to your personal data
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Your rights
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Under some circumstances, you may have certain rights in relation to
          your Personal Data. For example, you may have the right to:
        </p>
        <ul className={styles["mui-style-ltr-f6u4m3"]}>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Request access to your Personal Data:{" "}
            </span>
            This allows you to receive a copy of the Personal Data we hold about
            you, and to check that we are lawfully processing it.
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Request the correction of your Personal Data:{" "}
            </span>
            This allows you to ask for any incomplete or inaccurate information
            we hold about you to be corrected.
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Request the erasure of your Personal Data:{" "}
            </span>
            This allows you to ask us to delete or remove your Personal Data
            from our systems where there is no good reason for us to continue
            processing it.
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Object to the processing of your Personal Data:{" "}
            </span>
            This allows you to object to our processing of your Personal Data
            for a specific purpose (for example, for marketing purposes).
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Request the transfer of your Personal Data:{" "}
            </span>
            This allows you to request the transfer of your Personal Data in a
            structured, commonly-used, machine-readable format, either to you or
            to a third party designated by you.
          </li>
          <li
            className={styles["MuiListItem-root"]}
          >
            <span className={styles["mui-style-ltr-17prdac"]}>
              Withdraw your Consent:{" "}
            </span>
            This right only exists where we are relying on your Consent to
            process your Personal Data. If you withdraw your Consent, we may not
            be able to provide you with access to the certain features of our
            Platform. We will advise you if this is the case at the time you
            withdraw your Consent.
          </li>
        </ul>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Please note that not all of the rights listed above may be available
          to you, and some rights may only be exercisable in specific
          circumstances.
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          How to exercise your rights
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          If you want to exercise any of the rights described above, please
          contact us.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We may need to request specific information from you to help us
          confirm your identity and ensure your right to access your Personal
          Data (or to exercise any of your other rights). This is a security
          measure to ensure that your Personal Data is not disclosed to any
          person who has no right to receive it. We may also contact you to ask
          you for further information in relation to your request to speed up
          our response.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We try to respond to all legitimate requests within one month of
          receipt. Occasionally, it may take us longer than a month if your
          request is particularly complex or if you have made a number of
          requests. In this case, we will notify you and keep you updated.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Although we will typically not charge a fee for exercising your rights
          described above, we reserve the right to charge a reasonable fee in
          some circumstances (for example, if your request is unreasonable or if
          you submit an excessive number of requests).
        </p>
        <p className={styles["mui-style-ltr-17prdac"]}>
          Complaints
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          If you would like to make a complaint regarding this Privacy Policy or
          our practices in relation to your Personal Data, please contact us. We
          will reply to your complaint as soon as we can.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          If you are unsatisfied with our response to any issue that you raise
          with us, you may have the right to submit a complaint to the data
          protection authority in your jurisdiction.
        </p>
      </div>
      <div id="marketing-communications" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Marketing Communications
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          You can ask us to stop sending you marketing messages at any time by
          logging in to the Platform and checking or unchecking relevant boxes
          to adjust your marketing preferences, or by following the
          &quot;Unsubscribe&quot; link included at the bottom of any marketing email you
          receive from us.
        </p>
      </div>
      <div id="policy-on-minor" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Our policy on minors
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          This Platform is not intended to be used by minors, and we do not
          actively monitor the age of our users.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          However, if you become aware that a minor has been using the Platform
          in breach of this restriction, please contact us if you would like us
          to remove their Personal Data from our systems.
        </p>
      </div>
      <div id="third-party-links" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Third party links
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          This Platform may include links to third party websites and
          applications. Clicking on those links will take you off-Platform and
          may allow third parties to collect or share your Personal Data. We do
          not control these third-party websites and applications and are not
          responsible for their privacy practices. When you leave our Platform,
          we encourage you to read the privacy policy of every website and
          application you visit.
        </p>
      </div>
      <div id="changes-to-privacy-policy" className={styles["mui-style-ltr-2wowr4"]}>
        <p className={styles["mui-style-ltr-5bs74m"]}>
          Changes to this privacy policy
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          We reserve the right to update this Privacy Policy at any time, with
          or without notice to you.
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Where that is the case, we will update this page to display the
          revised Privacy Policy and may also under certain circumstances notify
          you (for example, by email).
        </p>
        <p className={styles["mui-style-ltr-1ddiinb"]}>
          Any revisions to this Privacy Policy will be effective immediately
          once posted on this page.
        </p>
      </div>
      <div className={styles["mui-style-ltr-2wowr4"]}>

        <p className={styles["mui-style-ltr-5bs74m"]}>
          Data Privacy Notice for Candidates or Job Applications
        </p>
        <p className="mui-style-ltr-f54z15">
          Data Privacy Notice for Candidates or Job Applications can be found
          here:{" "}
          <a
            className={styles["mui-style-ltr-2jyucd"]}
            href="/data-privacy-for-jobs"
            target="_blank"
            rel="noreferrer"
          >
            Data Privacy Notice for Candidates or Job Applications
          </a>
        </p>
      </div>
    </div>
  );
}
