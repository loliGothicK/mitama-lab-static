import { Message } from './types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

export const groupBy = <K extends PropertyKey>(arr: Message[], key: (i: Message) => K) =>
  arr.reduce((groups, item) => {
    if (groups.has(key(item))) groups.set(key(item), item);
    else groups.set(key(item), { ...item, content: groups.get(key(item))?.content + item.content });
    return groups;
  }, new Map<K, Message>());

const Hits: React.FC<HitsProvided<Message>> = ({ hits }) => {
  const aggregate = groupBy(
    hits.sort((h1, h2) => (h1.objectID.slice(-1) < h2.objectID.slice(-1) ? 1 : -1)),
    hit => hit.objectID.slice(0, -2),
  );

  return (
    <List>
      {[...aggregate.values()].map(hit => (
        <ListItem key={hit.objectID}>
          <ListItemText>
            <Link href={hit.url}>
              <Typography>{hit.title}</Typography>
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default connectHits(Hits);
