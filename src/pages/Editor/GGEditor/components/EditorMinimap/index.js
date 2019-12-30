import React from 'react';
import { Card } from 'antd';
import { Minimap } from 'gg-editor';

const EditorMinimap = () => {
  return (
    <Card type="inner" size="small" title="预览小图" bordered={false}>
      <Minimap height={200} />
    </Card>
  );
};

export default EditorMinimap;
