import React, { Component } from 'react';
import { useJwt } from "react-jwt";


function useJWTCheckExpire(access_token){
    const { decodedToken, isExpired } = useJwt(access_token);
    return isExpired;
}

export default useJWTCheckExpire;
