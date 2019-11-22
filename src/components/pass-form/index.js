import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Form, Row, Col, Button} from 'react-bootstrap';

import PassInput from '../pass-input';

import generatePass from '../../pass';

import {_t} from '../../i18n';

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
            {_t('pass-form.length-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Control as="select" value={length} onChange={this.lengthChanged}>
              <optgroup label={_t('pass-form.length-help-1')}>
                {[16, 32, 64].map(l => <option key={l}>{l}</option>)}
              </optgroup>
              <optgroup label={_t('pass-form.length-help-2')}>
                {[64, 128, 256].map(l => <option key={l}>{l}</option>)}
              </optgroup>
              <optgroup label={_t('pass-form.length-help-3')}>
                {[512, 1024, 2048].map(l => <option key={l}>{l}</option>)}
              </optgroup>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-lowercase">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.lowercase-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.lowercase-help')} type="checkbox" data-ref="lower" checked={lower}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-uppercase">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.uppercase-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.uppercase-help')} type="checkbox" data-ref="upper" checked={upper}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-numbers">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.numbers-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.numbers-help')} type="checkbox" data-ref="numbers" checked={numbers}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-symbols">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.symbols-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.symbols-help')} type="checkbox" data-ref="symbols" checked={symbols}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-exclude-similar">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.exclude-similar-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.exclude-similar-help')} type="checkbox" data-ref="excludeSimilar"
                        checked={excludeSimilar}
                        onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="form-item-exclude-ambiguous">
          <Form.Label className="col-form-label-no-pad" column={true} sm={5}>
            {_t('pass-form.exclude-ambiguous-label')}
          </Form.Label>
          <Col sm={7}>
            <Form.Check label={_t('pass-form.exclude-ambiguous-help')} type="checkbox" data-ref="excludeAmbiguous"
                        checked={excludeAmbiguous} onChange={this.optionChanged}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={12}>
            <Button size="lg" variant="primary" block
                    onClick={this.generate}>{_t('pass-form.generate-btn-label')}</Button>
          </Col>
        </Form.Group>
        {pass &&
        <>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={12}>
              <PassInput value={pass} canToggle={false}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={12}>
              <Button size="lg" variant="success" block onClick={this.save}>{_t('pass-form.save-btn-label')}</Button>
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


