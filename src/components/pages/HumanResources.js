import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';

export default function HumanResources() {
  return (
    <div className="human-resources">
      <Container fluid>
        <Row id="download-options">
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5" id="faq">
                  FAQs
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Frequently Asked Questions
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Group and Parental Medical Policy
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Know More about the Group and Medical Policy
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Group Personal Accident Insurance
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Know more about the Group Personal Accident Insurance
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Group Term Life Insurance</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Know More about the Group Term Life Insurance
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Claim Intimation Process</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Prior intimation to insurance company in case of
                  hospitalisation in non-network hospital
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Sample Claim Reimbursement Form</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  For reimbursement of claims, Please utilize this form to share
                  the requisite details
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Claim Reimbursement Form Editable Version
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  For reimbursement of claims, Please utilize this form to share
                  the requisite details
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Claim Reimbursement Form PDF Version
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  For reimbursement of claims, Please utilize this form to share
                  the requisite details
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Network List of Hospital</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Please refer to the document to know the hospitals which fall
                  within the network of the insurance provide
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Excluded list of hospitals</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Please refer to the document to know the excluded hospitals
                  which do not fall within the network of the insurance provider
                </CardSubtitle>
                <Button className="incedoguide-download">Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
