import React from "react";

import { getProfile } from "../../../utils/getters";
import ProfileEdit from "../../../components/ProfileEdit";
import ProfileView from "../../../components/ProfileView";
import ProfileRegister from "../../../components/ProfileRegister";
import ProfileRegisterAgreed from "../../../components/ProfileRegisterAgreed";

export default function Profile({ query, data }) {
  const { mode, agreed } = query;
  const profileMode = (mode || "").toLowerCase();

  if (profileMode === "editprofile") {
    return <ProfileEdit data={data} />;
  } else if (profileMode === "viewprofile") {
    return <ProfileView data={data} />;
  } else if (profileMode === "register" && agreed === "true") {
    return <ProfileRegisterAgreed data={data} />;
  } else if (profileMode === "register") {
    return <ProfileRegister data={data} />;
  } else if (profileMode === "watchlist_ads") {
    return null;
  } else if (profileMode === "watchlist_album") {
    return null;
  } else if (profileMode === "watchlist") {
    return null;
  } else if (profileMode === "emaillist_ads") {
    return null;
  } else if (profileMode === "watchlist_sellers") {
    return null;
  } else if (profileMode === "foelist_class") {
    return null;
  } else if (profileMode === "favorite_searches") {
    return null;
  } else if (profileMode === "alerts") {
    return null;
  } else if (profileMode === "bookmarks") {
    return null;
  } else if (profileMode === "buddylist") {
    return null;
  } else if (profileMode === "foelist") {
    return null;
  }

  return null;
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getProfile(context.req, context.query);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      query: context.query,
      data,
      ...rest,
    },
  };
}
