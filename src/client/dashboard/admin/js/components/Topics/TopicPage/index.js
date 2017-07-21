import React from 'react';

import Dialog from 'material-ui/Dialog';

import DialogTitle from './DialogTitle';
import BasicInfo from './BasicInfo/';
import Sections from './Sections';
import Students from './Students';
import { colors } from '../../../../../shared/js/constants';
import '../../../../css/topic-page.less';

const style = {
  dialog: {
    container: {
      width: '60%',
      maxWidth: 1000000,
    },
    body: {
      padding: 10,
      backgroundColor: colors.background,
    },
  },
};

const TopicPage = props => {
  const tabs = [
    { name: 'Sections', component: <Sections /> },
    { name: 'Students', component: <Students /> },
  ];
  return (
    <Dialog
      title={ <DialogTitle /> }
      open={ props.open }
      autoScrollBodyContent
      className="topic-page"
      contentStyle={ style.dialog.container }
      bodyStyle={ style.dialog.body }
    >
      <BasicInfo />
      <nav id="nav">
        {
          tabs.map((tab, index) => {
            return (
              <span
                key={ index }
                className={ props.tab === index ? 'current' : '' }
                onClick={ props.handleTabClick(index) }
              >
                  { tab.name }
              </span>
            );
          })
        }
      </nav>
      {
        tabs.map((tab, index) => {
          return (
            <div
              key={ index }
              style={ props.tab === index ? { display: 'block' } : { display: 'none' }}
            >
              { tab.component }
            </div>
          );
        })
      }
    </Dialog>
  );
};

export default TopicPage;
