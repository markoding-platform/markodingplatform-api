import DAO from '../daos/DAO'

class Service {
  protected dao: DAO

  constructor (dao: DAO) {
    this.dao = dao
  }
}

export default Service
