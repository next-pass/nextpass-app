import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Form, Row, Col, Button} from 'react-bootstrap';

import PassInput from '../pass-input';

import generatePass from '../../pass';

class PassGenerator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      length: 32,
      lower: true,
      upper: true,
      numbers: true,
      symbols: true,
      excludeSimilar: true,
      excludeAmbiguous: false,
      pass: ''
    }
  }

  lengthChanged = (e) => {
    this.setState({length: e.target.value})
  };

  optionChanged = (e) => {
    const el = e.target;
    const s = el.getAttribute('data-ref');
    this.setState({[s]: el.checked});
  };

  generate = () => {
    this.setState({pass: ''});

    const pass = generatePass(this.state.length, this.state);
    this.setState({pass});
  };

  save = () => {
    const {setNextPass, onSave} = this.props;
    const {pass} = this.state;
    setNextPass(pass);
    onSave()
  };

  render() {
    const {length, lower, upper, numbers, symbols, excludeSimilar, excludeAmbiguous, pass} = this.state;

    return <div className="generate-pass-form">
      <Form>
        <Form.Group as={Row} controlId="form-item-length">
          <Form.Label column={true} sm={5}>
            Password Length:
          </Form.Label>
          <Col sm={7}>
            <Form.Control as="select" value={length} onChange={this.lengthChanged}>
              <optgroup label="Strong">
                {[16, 32, 64].map(l => <option key={l}>{l}</option>)}
              </optgroup>
              <optgroup label="Very Strong">
                {[64, 128, 256].map(l => <option key={l}>{l}</option>)}
              </optgroup>
              <optgroup label="Unbelievable">
                {[512, 1024, 2048].map(l => <option key={l}>{l}</option>)}
              </optgroup>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-lowercase">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Include Lowercase Characters:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label="(e.g. abcdefgh)" type="checkbox" data-ref="lower" checked={lower}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-uppercase">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Include Uppercase Characters:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label="(e.g. ABCDEFGH)" type="checkbox" data-ref="upper" checked={upper}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-numbers">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Include Numbers:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label="(e.g. 123456)" type="checkbox" data-ref="numbers" checked={numbers}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-symbols">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Include Symbols:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label="(e.g. @#$%)" type="checkbox" data-ref="symbols" checked={symbols}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-exclude-similar">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Exclude Similar Characters:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label="(e.g. i,l,1,L,o,0,O)" type="checkbox" data-ref="excludeSimilar" checked={excludeSimilar}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="form-item-exclude-ambiguous">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            Exclude Ambiguous Characters:
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={"( { } [ ] ( ) / \\ ' \" ` ~ , ; : . < > )"} type="checkbox" data-ref="excludeAmbiguous"
                        checked={excludeAmbiguous} onChange={this.optionChanged}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={12}>
            <Button size="lg" variant="primary" block onClick={this.generate}>Generate Password</Button>
          </Col>
        </Form.Group>

        {pass &&
        <>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={12}>
              <PassInput value={pass}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={12}>
              <Button size="lg" variant="success" block onClick={this.save}>Save That Password</Button>
            </Col>
          </Form.Group>
        </>
        }

      </Form>
    </div>
  }
}

PassGenerator.defaultProps = {
  onSave: () => {
  }
};

PassGenerator.propTypes = {
  setNextPass: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

export default PassGenerator;


