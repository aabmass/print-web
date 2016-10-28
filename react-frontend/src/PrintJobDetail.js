import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

import { isImageFile, computeFileName } from './utils';

const PrintJobDetail = (props) => {
  const { print } = props;
  const isImage = isImageFile(print.file_uploaded);
  const fileName = computeFileName(print.file_uploaded);

  return (
    <Card fluid>
      {isImage ?
        <Image src={print.file_uploaded} />
      :
        null
      }

      <Card.Content>
        <Card.Header>
          <a href={print.file_uploaded} target="_blank"><pre>{fileName}</pre></a>
        </Card.Header>
        <Card.Meta>
          <div className="date">Uploaded On: {print.created}</div>
          <div className="date">
            {print.last_printed === null ?
              'Never printed'
            :
              `Last Printed: ${print.last_printed}`
            }
          </div>

        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button
            color="green"
            labelPosition="left"
            icon="print"
            content="Print"
          />
          <Button.Or />
          <Button
            color="red"
            labelPosition="right"
            icon="delete"
            content="Delete"
            onClick={props.onDeletePrintJob}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  ); 
};

export default PrintJobDetail;
