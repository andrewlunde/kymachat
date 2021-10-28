namespace my.bookshop;
//             12345678-1234-1234-1234-123456789012 8+1+4+1+4+1+4+1+12 = 36
// TenantID  : 6af31eb5-7905-42da-b1d4-c6646b6e9437
// SubacctID : 6af31eb5-7905-42da-b1d4-c6646b6e9437
//            1234567890123456789012345678901234 = 34
// BTC_ADDR : 32DLHu2oYZswRXTcqqafA1k4NPBxhzzqAB
// BTC_ADDR : 1FW8TuWWbBLxzTjBcNP5X9d2MnjCWRSvYH
//            123456789012345678901234567890123456789012 = 42
// ETH_ADDR : 0x9894f3631d8574d7ee43a04ce0a3826da9ee0d49
// ETH_ADDR : 0xc88f7666330b4b511358b7742dc2a3234710e7b1
// ETH_ADDR : 0x2ed58ec12dd5cedaf88c564bd16e3a80c0a56257
//            123456789012345678901234567890123456789012 = 42
// THETA    : 0xce6a0549afbd36100a131a2cd20a82b920620e79
using {cuid,managed} from '@sap/cds/common';

type SaasID : String(26);

type Tenant_ID : SaasID;
type Subaccount_ID : SaasID;

type BTC_Addr : String(34);

type ETH_Addr : String(42);
type Theta_Addr : ETH_Addr;

type Genre : String enum {
  Mystery;
  Fiction;
  Drama;
  Horror;
}

type CustStatus : String enum {
  Trial; Eval; Active; Suspended; Archived;
}

entity Books : cuid,managed {
  TenantID : Tenant_ID;
  SubaccountID : Subaccount_ID;
  title : String;
  author : Association to Authors;
  stock : Integer;
  code  : Integer;
  genre : Genre;
}

entity Authors : cuid,managed {
  TenantID : Tenant_ID;
  name   : String(111);
  books  : Association to many Books on books.author = $self;
  genre : Genre;
}

entity Customers : cuid {
  TenantID : Tenant_ID;
  name : String;
  status : CustStatus;
}

entity Config : cuid {
  key name : String;
  value  : String;
}