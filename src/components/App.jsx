import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { getTree } from '../services/ApiTestVmarmysh';
import { Button, ButtonGroup, Typography } from '@mui/material';

// const data1 = {
//   id: 'root',
//   name: 'Parent',
//   children: [
//     {
//       id: '1',
//       name: 'Child - 1',
//     },
//     {
//       id: '3',
//       name: 'Child - 3',
//       children: [
//         {
//           id: '4',
//           name: 'Child - 4',
//         },
//       ],
//     },
//   ],
// };

// getData();

// console.log('object :>> ', getData());
// console.log('object1 :>> ', data);

export default function App() {
  const [items, setItems] = useState({});

  const getData = async () => {
    try {
      const data = await getTree('GUID');
      // setItems({...data});
      setItems(prev => ({
        ...prev,
        ...data,
      }));
      // console.log(data);
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
      // label={nodes.name}
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
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
      }
      sx={{ fontSize: '2rem' }}
    >
      {/* <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup> */}
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
        sx={{ fontSize: '2rem', flexDirection: 'row' }}
      >
        {renderTree(items)}
      </TreeView>
    </Box>
  );
}
