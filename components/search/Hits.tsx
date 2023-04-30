import { Message } from './types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

const Hits: React.FC<HitsProvided<Message>> = ({ hits }) => {
  const aggregate = groupBy(hits, hit => hit.objectID.slice(0, -2));

  return (
    <List>
      {Object.values(aggregate).map(hit => (
        // @ts-ignore
        <ListItem key={hit[0].objectID}>
          <ListItemText>
            { /* @ts-ignore */ }
            <Link href={hit[0].url}>
              { /* @ts-ignore */ }
              <Typography>{hit[0].title}</Typography>
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default connectHits(Hits);
