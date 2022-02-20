import React from 'react';
import {dynamic} from "umi";

interface state {
}

interface props {
}

export default dynamic({
  loader: async function() {
    const { default: ShowMessage } = await import('./ShowMessage');
    return ShowMessage;
  },
});
