import React from 'react';

export const Modal = React.createClass({
  getDefaultProps: function() {
    return {
      isShow: false
    };
  },

  onClose: function() {
    this.props.isShow = false;
    this.forceUpdate();
  },

  getFields: function() {
    return this.props.data.fields.map((field, i) => {
      const inputName = 'input' + i;
      let fieldHtml;

      switch(field.type) {
        default:
        case 'text': {
          fieldHtml = (
            <div className="form-group">
              <label for={inputName}>{field.title}</label>
              <input type="text" name={field.name} className="form-control" id={inputName} placeholder={field.title} defaultValue={field.value} />
            </div>
          );
          break;
        }

        case 'hidden': {
          let required = '';
          if (field.required) {
            required = ' required="required" '
          }

          fieldHtml = (
            <input type="hidden" name={field.name} id={inputName} value={field.value} />
          );
          break;
        }

        case 'select': {
          let items = field.items.map(item => {
            if (item === field.value) {
              return (
                <option value={item} selected="selected">{item}</option>
              );
            } else {
              return (
                <option value={item}>{item}</option>
              );
            }
          });

          fieldHtml = (
            <div className="form-group">
              <label for={inputName}>{field.title}</label>
              <select type="text" name={field.name} className="form-control" id={inputName} placeholder={field.title}>
                {items}
              </select>
            </div>
          );
          break;
        }

        case 'textarea': {
          let required = '';
          if (field.required) {
            required = ' required="required" '
          }

          fieldHtml = (
            <div className="form-group">
              <label for={inputName}>{field.title}</label>
              <textarea name={field.name} className="form-control" id={inputName} placeholder={field.title} {...required}>{field.value}</textarea>
            </div>
          );
          break;
        }
      }
      return fieldHtml;
    });
  },

  render: function() {
    let isShow = 'none';
    let cls = 'modal fade out';
    let content = '';
    if (this.props.isShow) {
      isShow = 'block';
      cls = 'modal fade in';

      if (this.props.data.content) {
        content = (
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.onClose}>&times;</span></button>
              <h4 className="modal-title">{this.props.data.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.data.content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onClose}>Close</button>
            </div>
          </div>
        );
      } else if (this.props.data.fields) {
        content = (
          <div className="modal-content">
            <form onSubmit={this.props.data.submit} method="GET">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.onClose}>&times;</span></button>
                <h4 className="modal-title">{this.props.data.title}</h4>
              </div>
              <div className="modal-body">
                {this.getFields()}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Ok</button>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onClose}>Cancel</button>
              </div>
            </form>
          </div>
        );
      }
    }

    return (
      <div className={cls} id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style={{
        display: isShow,
        background: 'rgba(0,0,0,0.5)'
      }}>
        <div className="modal-dialog" role="document">
          {content}
        </div>
      </div>
    );
  }
});
