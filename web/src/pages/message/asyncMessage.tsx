import React from 'react';
import {dynamic} from "umi";

interface state {
}

interface props {
}

export default dynamic({
  loader: async function() {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    const { default: ShowMessage } = await import(/* webpackChunkName: "external_A" */ './ShowMessage');
    return ShowMessage;
  },
});
