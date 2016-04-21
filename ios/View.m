//
//  View.m
//  AirMsgProject
//
//  Created by Dasha on 17/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "View.h"

@implementation View

-(void) setObjSrc:(NSString *)objSrc{
  NSLog(@"setting");
  NSLog(@"%@", objSrc);
  _objSrc = objSrc;
}

-(NSString*) getObjSrc {
  NSLog(@"getting");
  NSLog(@"%@", self.objSrc);
  return self.objSrc;
}
@end
