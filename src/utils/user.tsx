import React, { useEffect, useRef, useState } from "react";
import api from "../api.js";
import keycloak from "../keycloak.js";

function Profile() {
  if (!keycloak.authenticated) return null;

  const tokenParsed = keycloak.tokenParsed;

  console.log(tokenParsed);

  return {
    Username: tokenParsed?.preferred_username,
    Email: tokenParsed?.email,
    Name: tokenParsed?.name,
    Userid: tokenParsed?.sub,
  };
}

async function fetchuser() {
  const prof = Profile();
  const user = await api.get<any>("users/" + prof?.Userid);
  return user?.data[0];
}

export default fetchuser;
