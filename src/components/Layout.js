import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";

import { withPrefix } from "../utils";
import "../sass/main.scss";
import Header from "./Header";
import Footer from "./Footer";

export default class Body extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {_.get(this.props, "pageContext.frontmatter.title", null) &&
              _.get(this.props, "pageContext.frontmatter.title", null) + " - "}
            {_.get(this.props, "pageContext.site.siteMetadata.title", null)}
          </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content={
              _.get(this.props, "pageContext.frontmatter.excerpt", null) ||
              _.get(this.props, "pageContext.site.siteMetadata.description", null)
            }
          />
          {/* <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" rel="stylesheet" /> */}
          {_.get(this.props, "pageContext.frontmatter.template", null) === "post" &&
            _.get(this.props, "pageContext.frontmatter.canonical_url", null) && (
              <link rel="canonical" href={_.get(this.props, "pageContext.frontmatter.canonical_url", null)} />
            )}
          {_.get(this.props, "pageContext.site.siteMetadata.favicon", null) && (
            <link rel="icon" href={withPrefix(_.get(this.props, "pageContext.site.siteMetadata.favicon", null))} />
          )}
        </Helmet>
        <div
          id="page"
          className={
            "site style-" +
            _.get(this.props, "pageContext.site.siteMetadata.layout_style", null) +
            " palette-" +
            _.get(this.props, "pageContext.site.siteMetadata.palette", null)
          }
        >
          <Header {...this.props} />
          <div id="content" className="site-content">
            <div className="inner">
              <main id="main" className="site-main">
                {this.props.children}
              </main>
              <Footer {...this.props} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
