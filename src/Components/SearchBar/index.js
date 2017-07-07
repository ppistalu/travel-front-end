import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class SearchBar extends Component {
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: Object.values(this.props.options).map(e => e.name.toLowerCase())
    });
  };

  render() {
      let {options} = this.props;
      options = Object.values(options).map(e => e.name)
    return (
      <div style ={{display:"flex"}}>
        <AutoComplete style = {{margin:'0 auto'}}
          hintText="example: basel"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />
      </div>
    );
  }
}