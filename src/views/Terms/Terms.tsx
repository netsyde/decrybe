import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, colors } from '@material-ui/core';

import { Page, Markdown } from '../../components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 3, 6, 3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  markdownContainer: {
    maxWidth: 700
  }
}));

const Terms = () => {
  const classes = useStyles(1);

  const [source, setSource] = useState('');

  useEffect(() => {
    fetch('/docs/Terms.md')
      .then(response => response.text())
      .then(text => setSource(text));
  }, []);

  return (
    <Page
      className={classes.root}
      title="Terms and Conditions"
    >
      <Typography
        gutterBottom
        variant="overline"
      >
        Support
      </Typography>
      <Typography variant="h3">Terms and Conditions</Typography>
      <Divider className={classes.divider} />
      {source && (
        <div className={classes.markdownContainer}>
          <Markdown
            source={source}
          />
        </div>
      )}
    </Page>
  );
};

export default Terms;
