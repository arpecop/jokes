import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';
import { Col, Row } from 'antd';

const Programm = (props) => {
  const [state, setState] = useImmer({
    items: [],
  });

  useEffect(() => {
    async function mount() {
      const items = await axios(
        'https://pouchdb.herokuapp.com/chetiva/_design/i/_view/pr0?limit=50&reduce=false',
      );
      console.log(items.data.rows);

      setState((draft) => {
        draft.items = items.data.rows;
      });
    }
    mount();
  }, []);
  return (
    <Row type="flex" justify="center">
      {state.items.map((item) => (
        <Col
          xs={10}
          sm={8}
          md={6}
          lg={4}
          xl={2}
          key={item.key}
          style={{ textAlign: 'center' }}
        >
          <a href="">
            <img
              src={item.value.thumb.replace('img', 'thumb')}
              alt=""
              style={{ width: '100%' }}
            />
          </a>
        </Col>
      ))}
    </Row>
  );
};
export default Programm;
