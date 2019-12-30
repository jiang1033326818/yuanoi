import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';

const FlowToolbar = () => {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarButton command="undo" text="撤销" />
      <ToolbarButton command="redo" text="恢复" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="适应图层" />
      <ToolbarButton command="resetZoom" icon="actual-size" text="实际尺寸" />
      <Divider type="vertical" />
      <ToolbarButton command="append" text="添加节点" />
      <ToolbarButton command="appendChild" icon="append-child" text="添加子节点" />
      <Divider type="vertical" />
      <ToolbarButton command="collapse" text="收起" />
      <ToolbarButton command="expand" text="展开" />
    </Toolbar>
  );
};

export default FlowToolbar;
