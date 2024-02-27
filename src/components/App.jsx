import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import {getTree} from '../services/ApiTestVmarmysh'

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
      setItems({...data});
      // setItems(items => ({
      //   ...items,
      //   ...data
      // }));
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  console.log('data :>> ', items);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(items)}
      </TreeView>
    </Box>
  );
}
