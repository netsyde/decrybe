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
  },
  markdown: {
    '& h1': {
      ...theme.typography.h1,
      marginBottom: theme.spacing(1)
    },
    '& h2': {
      ...theme.typography.h2,
      marginBottom: theme.spacing(1)
    },
    '& h3': {
      ...theme.typography.h3,
      marginBottom: theme.spacing(1)
    },
    '& h4': {
      ...theme.typography.h4,
      marginBottom: theme.spacing(1)
    },
    '& h5': {
      ...theme.typography.h5,
      marginBottom: theme.spacing(1)
    },
    '& h6': {
      ...theme.typography.h6,
      marginBottom: theme.spacing(1)
    },
    '& p': {
      ...theme.typography.subtitle1,
      marginBottom: theme.spacing(2)
    },
    '& ul': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    '& ol': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    '& li': {
      ...theme.typography.subtitle1,
      marginBottom: theme.spacing(1)
    },
    '& hr': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      backgroundColor: colors.grey[300],
      border: 0,
      height: 1
    },
    '& a': {
      color: colors.blue[800],
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));

const Changelog = () => {
  const classes = useStyles(1);

  const [source, setSource] = useState('');

  useEffect(() => {
    fetch('/docs/Changelog.md')
      .then(response => response.text())
      .then(text => setSource(text));
  }, []);

  return (
    <Page
      className={classes.root}
      title="Changelog"
    >
      <Typography
        gutterBottom
        variant="overline"
      >
        Support
      </Typography>
      <Typography variant="h3">Changelog</Typography>
      <Divider className={classes.divider} />
      {source && (
        <div className={classes.markdownContainer}>
          <Markdown
            //escapeHtml={false}
            className={classes.markdown}
            source={source} //
          />
        </div>
      )}
    </Page>
  );
};

export default Changelog;
