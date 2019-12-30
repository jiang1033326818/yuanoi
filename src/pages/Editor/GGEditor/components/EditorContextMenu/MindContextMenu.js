import React from 'react';
import { NodeMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import MenuItem from './MenuItem';
import styles from './index.less';

const MindContextMenu = () => {
  return (
    <ContextMenu className={styles.contextMenu}>
      <NodeMenu>
        <MenuItem command="append" text="新建节点" />
        <MenuItem command="appendChild" icon="append-child" text="新建子节点" />
        <MenuItem command="collapse" text="收起" />
        <MenuItem command="expand" text="展开" />
        <MenuItem command="delete" text="删除" />
      </NodeMenu>
      <CanvasMenu>
        <MenuItem command="undo" text="撤销" />
        <MenuItem command="redo" text="恢复" />
      </CanvasMenu>
    </ContextMenu>
  );
};

export default MindContextMenu;
