import React, { Component } from 'react'
import { PropTypes } from '../../family'
import Organization from './Organization'

// 展示组件
class OrganizationList extends Component<any, any> {
  // DONE 2.1 补全 propTypes
  static propTypes = {
    name: PropTypes.string,
    organizations: PropTypes.array.isRequired,
  }
  render() {
    const { name, organizations } = this.props
    if (!organizations.length) {
      return name
        ? <div className="fontsize-20 text-center p50">沒有找到相符 <strong>{name}</strong> 的團隊</div>
        : <div className="fontsize-20 text-center p50">沒有資料</div>
    }
    return (
      <div className="OrganizationList row">
        {organizations.map((organization: any) =>
          <Organization key={organization.id} organization={organization} />
        )}
      </div>
    )
  }
}

export default OrganizationList
