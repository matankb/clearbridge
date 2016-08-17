export const TOGGLE_TOPIC_PAGE = 'TOPICS/TOGGLE_TOPIC_PAGE';
export const SET_TOPIC_PAGE_TAB = 'TOPICs/SET_TOPIC_PAGE_TAB';
export const REQUEST_USER_REMOVAL = 'TOPICS/REQUEST_USER_REMOVAL';
export const RECEIVE_USER_REMOVAL = 'TOPICS/RECEIVE_USER_REMOVAL';
export const REQUEST_SECTION_CREATION = 'TOPICs/REQUEST_SECTION_CREATION';
export const RECEIVE_SECTION_CREATION = 'TOPICs/RECEIVE_SECTION_CREATION';
export const SET_EDITING_SECTION = 'TOPICs/SET_EDITING_SECTION';
export const SET_EDITING_DATA = 'TOPICs/SET_EDITING_DATA';
export const REQUEST_SECTION_UPDATING = 'TOPICS/REQUEST_SECTION_UPDATING';
export const RECEIVE_SECTION_UPDATING = 'TOPIC/REQUEST_RECEIVE_SECTION_UPDATING';

export function toggleTopicPage() {
  return {
    type: TOGGLE_TOPIC_PAGE,
  };
}

export function setTopicPageTab(tab) {
  return {
    type: SET_TOPIC_PAGE_TAB,
    tab,
  };
}

export function requestSectionCreation() {
  return {
    type: REQUEST_SECTION_CREATION,
  };
}

export function receiveSectionCreation(section, onCurrentTopic, topicId) {
  return {
    type: RECEIVE_SECTION_CREATION,
    section,
    onCurrentTopic, // reducers will automatically add section to current topic
    topicId: topicId || null,
  };
}

export function postSection(onCurrentTopic, topicId) {

  return function(dispatch, getState) {

    let state = getState();
    let topic = state.topics.topicList.selected;

    dispatch(requestSectionCreation());
    fetch(`/api/topics/${topic}/sections/`, {
      method: 'POST',
      credentials: 'same-origin',
    })
      .then(createdSection => {
        dispatch(receiveSectionCreation(createdSection, onCurrentTopic, topicId));
      });
  };

}

export function setEditingSection(_id) {
  return {
    type: SET_EDITING_SECTION,
    _id,
  };
}

export function setSectionEditingData(data) {
  return {
    type: SET_EDITING_DATA,
    data,
  };
}

export function requestSectionUpdating() {
  // TODO: make this actually do something
  return {
    type: REQUEST_SECTION_UPDATING,
  };
}

export function receiveSectionUpdating(data, sectionId, onCurrentTopic, topicId) {
  return {
    type: RECEIVE_SECTION_UPDATING,
    data,
    sectionId,
    onCurrentTopic,
    topicId,
  };
}

export function patchSection(data, sectionId, onCurrentTopic, topicId) {
  return function(dispatch, getState) {

    let state = getState();
    let topic = topicId || state.topics.topicList.selected;

    dispatch(requestSectionUpdating());

    fetch(`/api/topics/${topic}/sections/${sectionId}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(updatedSection => {
        dispatch(receiveSectionUpdating(updatedSection, sectionId, onCurrentTopic, topicId));
      });
  };
}
