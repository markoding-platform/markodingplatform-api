import Service from '../services/Service'

class Handler {
  protected service: Service

  constructor (service: Service) {
    this.service = service
  }
}

export default Handler