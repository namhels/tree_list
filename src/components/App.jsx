import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {  ButtonGroup, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { AddCircleOutlineIcon, EditIcon, DeleteForeverIcon } from '@mui/icons-material';


import { getTree } from '../services/ApiTestVmarmysh';
export default function App() {
  const [items, setItems] = useState({});

  const getData = async () => {
    try {
      const data = await getTree('GUID');
      setItems(prev => ({
        ...prev,
        ...data,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('data :>> ', items);

  const renderTree = nodes => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id?.toString()}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginRight: '16px', fontWeight: 'inherit', fontSize: '2rem' }}
          >
            {nodes.name}
          </Typography>
          <ButtonGroup variant="text" aria-label="Basic button group">
          <AddCircleOutlineIcon color="primary" fontSize="large" />
          <EditIcon color="primary" fontSize="large" />
          <DeleteForeverIcon color="error" fontSize="large" />
          </ButtonGroup>
        </Box>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={[items.name]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(items)}
      </TreeView>
    </Box>
  );
}
