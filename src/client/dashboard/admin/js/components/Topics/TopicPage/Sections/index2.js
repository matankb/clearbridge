import React from 'react';
import { connect } from 'react-redux';

import AddSection from './AddSection';
import Section from './Section';

import {
  postSection,
  setEditingSection,
  patchSection,
} from '../../../../actions/topics/';

let Sections = props => {
  return (
    <div className="sections">

      <AddSection
        handleAddClick={ props.handleAddSectionClick }
      />

      {
        props.sections.map((section, index) => {
          let isEditing = props.editingId === section._id;
          return (
            <Section
              name={ section.name }
              content={ section.content }
              isEditing={ isEditing }
              handleSectionClick={ props.handleSectionClick(section._id, isEditing) }
              handleCancel={ props.handleCancel }
              // returned fn will be invoked by Section with data
              handleSave={ props.handleSave(section._id) }
              key={ index }
            />
          );
        })
      }

    </div>
  );
};

function getTopicById(_id, topics) {
  return topics.filter(topic => topic._id === _id)[0] || {};
}

function mapStateToProps(state) {
  let topic = getTopicById(state.topics.topicList.selected, state.topics.topicList.topics);
  return {
    sections: topic.sections,
    editingId: state.topics.topicPage.sections.editing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddSectionClick: () => dispatch(postSection(true)),
    handleSectionClick: (_id, editing) => () => {
      if (!editing) {
        
        dispatch(setEditingSection(_id));
      }
    },
    handleCancel: () => dispatch(setEditingSection('')),
    handleSave: _id => data => {
      dispatch(patchSection(data, _id, true));
      dispatch(setEditingSection(''));
    },
  };
}

Sections = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sections);

export default Sections;
