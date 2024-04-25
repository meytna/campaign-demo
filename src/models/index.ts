export interface CampaignForm {
  campaign: Campaign
}

export interface CampaignInformation {
  name: string
  describe?: string
}

export class Campaign {
  information: CampaignInformation
  subCampaigns: SubCampaign[]

  constructor(information: CampaignInformation = { name: '', describe: '' }, subCampaigns: SubCampaign[] = []) {
    this.information = information
    this.subCampaigns = subCampaigns.length ? subCampaigns : [new SubCampaign()]
  }
}

export class SubCampaign {
  name: string
  status: boolean
  ads: Advertise[]

  constructor(name: string = 'SubCampaignName', status: boolean = true, ads: Advertise[] = []) {
    this.name = name
    this.status = status
    this.ads = ads.length ? ads : [new Advertise()]
  }
}

export class Advertise {
  name: string
  quantity: number

  constructor(name: string = 'AdsName', quantity: number = 0) {
    this.name = name
    this.quantity = quantity
  }
}