import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  actionSetJoyrideStart,
  actionSetJoyrideSteps,
} from '../redux/slice/projectSlice';

export default function GuideItem({ title, guideId }) {
  const dispatch = useDispatch();

  const startGuide = (e) => {
    dispatch(actionSetJoyrideSteps(guideId));
    dispatch(actionSetJoyrideStart(true));
  };

  return (
    <div onClick={startGuide}>
      <ListGroup>
        <ListGroupItem>
          <span className="guide-list-item">
            <FontAwesomeIcon icon={faPlayCircle} className="guide-blinking" />
            {title}
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
