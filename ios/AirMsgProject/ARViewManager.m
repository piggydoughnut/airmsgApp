//
//  ARViewManager.m
//  AirMsgProject
//
//  Created by Dasha on 14/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ARViewManager.h"
#import "ViewController.h"
#import "View.h"

@implementation ARViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(objSrc, NSString);

- (UIView *)view
{
  ViewController *_controller = [[ViewController alloc] init];
  NSLog(@"call controller view");
  return _controller.view;
}

@end